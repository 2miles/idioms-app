import express, { Request, Response } from 'express'; // Express import and type definitions
import dotenv from 'dotenv'; // Environment variable configuration
import morgan from 'morgan'; // HTTP request logger
import cors from 'cors'; // Cross-Origin Resource Sharing
import { jwtCheck } from './authMiddleware.js'; // JWT authentication middleware
import { checkRole } from './authMiddleware.js'; // Role-checking middleware
import pool from './db/index.js'; // Database connection pool

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Configure CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(','),
  credentials: true,
};

// Middleware setup
app.use(cors(corsOptions)); // CORS middleware
app.use(express.json()); // Parse JSON requests
app.use(morgan('dev')); // Logging middleware

// Set server port
const port = parseInt(process.env.PORT || '3001', 10);

// Health check route for e2e testing
if (process.env.NODE_ENV === 'test') {
  app.get('/', (_req: Request, res: Response) => {
    res.status(200).send('OK');
  });
}

app.get(
  ['/api/v1/idioms', '/api/v1/idioms/'],
  async (req: Request, res: Response) => {
    try {
      let page = parseInt((req.query.page as string) || '1', 10);
      let limit = parseInt((req.query.limit as string) || '20', 10);
      const offset = (page - 1) * limit;

      let search = (req.query.search as string) || '';
      const searchPattern = `%${search}%`;

      const allowedColumns = ['title', 'contributor', 'general'];
      const searchColumn = (req.query.searchColumn as string) || 'title';

      if (!allowedColumns.includes(searchColumn)) {
        res.status(400).json({ error: 'Invalid search column' });
        return;
      }

      let whereClause = '';
      if (searchColumn === 'general') {
        whereClause = `(title ILIKE $3 OR definition ILIKE $3)`;
      } else {
        whereClause = `${searchColumn} ILIKE $3`;
      }

      let totalWhereClause = '';
      if (searchColumn === 'general') {
        totalWhereClause = `(title ILIKE $1 OR definition ILIKE $1)`;
      } else {
        totalWhereClause = `${searchColumn} ILIKE $1`;
      }

      const allowedSortFields = [
        'position',
        'timestamps',
        'title',
        'definition',
        'contributor',
      ];
      let sortField = (req.query.sortField as string) || 'timestamps';
      let sortOrder = (req.query.sortOrder as string) || 'desc';

      if (!allowedSortFields.includes(sortField)) {
        res.status(400).json({ error: 'Invalid sort field' });
        return;
      }
      if (!['asc', 'desc'].includes(sortOrder)) {
        res.status(400).json({ error: 'Invalid sort order' });
        return;
      }

      // This query fetches a paginated and optionally filtered list of idioms, ordered by newest first (timestamps DESC),
      // while assigning each idiom its global position in the full dataset — even when a search filter is applied.
      //
      // Steps:
      // 1. `global_total`: counts the total number of idioms in the table (unfiltered).
      // 2. `ranked_all`: assigns a global row number to every idiom based on timestamp DESC.
      // 3. `filtered`: filters the ranked idioms by a case-insensitive search on the selected column,
      //    and computes a global `position` for each idiom using: (total + 1 - row_num).
      // 4. The final SELECT returns a page of filtered idioms with their correct global positions.
      //
      // This ensures that when users filter the table, the position values still reflect the idioms' true order in the
      // full dataset — not just within the filtered subset.

      const idiomsQuery = `
        WITH global_total AS (
          SELECT COUNT(*) AS total FROM idioms
        ),
        ranked_all AS (
          SELECT *,
            ROW_NUMBER() OVER (ORDER BY timestamps DESC) AS row_num
          FROM idioms
        ),
        filtered AS (
          SELECT *,
            (SELECT total FROM global_total) + 1 - row_num AS position
          FROM ranked_all
          WHERE ${whereClause}
        )
        SELECT *
        FROM filtered
        ORDER BY ${sortField} ${sortOrder}
        LIMIT $1 OFFSET $2;
        `;

      const totalCountQuery = `
        SELECT COUNT(*) AS total FROM idioms
        WHERE ${totalWhereClause}
        `;

      const [idiomsResult, countResult] = await Promise.all([
        pool.query(idiomsQuery, [limit, offset, searchPattern]),
        pool.query(totalCountQuery, [searchPattern]),
      ]);

      const totalCount = parseInt(countResult.rows[0].total, 10);

      res.status(200).json({
        status: 'success',
        data: {
          idioms: idiomsResult.rows,
          totalCount,
        },
      });
    } catch (error) {
      console.error('Error executing paginated idioms query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);

// Get single idiom, and get examples for that idiom
app.get('/api/v1/idioms/:id', async (req: Request, res: Response) => {
  try {
    const idiomQuery = await pool.query(
      ` SELECT * FROM idioms WHERE id = $1 `,
      [req.params.id],
    );
    const examplesQuery = await pool.query(
      `SELECT * FROM idiom_examples WHERE idiom_id = $1`,
      [req.params.id],
    );

    res.status(200).json({
      status: 'success',
      data: {
        idiom: idiomQuery.rows[0],
        examples: examplesQuery.rows,
      },
    });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create an idiom
app.post(
  '/api/v1/idioms/',
  jwtCheck,
  checkRole('Admin'),
  async (req: Request, res: Response) => {
    try {
      const insertQuery = `
      INSERT INTO idioms (title, title_general, definition, timestamps, contributor) 
      values ($1, $2, $3, $4, $5) 
      returning *
    `;
      const result = await pool.query(insertQuery, [
        req.body.title,
        req.body.title_general,
        req.body.definition,
        req.body.timestamps,
        req.body.contributor,
      ]);
      res.status(200).json({
        status: 'success',
        data: {
          idiom: result.rows[0],
        },
      });
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);

// Update an idiom
app.put(
  '/api/v1/idioms/:id',
  jwtCheck,
  checkRole('Admin'),
  async (req: Request, res: Response) => {
    try {
      const updateQuery = `
      UPDATE idioms 
      SET title = $1, title_general = $2, definition = $3, timestamps = $4, contributor = $5 
      WHERE id = $6 
      returning *
    `;
      const result = await pool.query(updateQuery, [
        req.body.title,
        req.body.title_general,
        req.body.definition,
        req.body.timestamps,
        req.body.contributor,
        req.params.id,
      ]);
      res.status(200).json({
        status: 'success',
        data: {
          idiom: result.rows[0],
        },
      });
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);

app.delete(
  '/api/v1/idioms/:id',
  jwtCheck,
  checkRole('Admin'),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deleteQuery = `
        DELETE FROM idioms 
        WHERE id = $1 
        RETURNING *
      `;

      const result = await pool.query(deleteQuery, [id]);

      if (result.rowCount === 0) {
        res.status(404).json({ error: 'Idiom not found' });
        return;
      }
      res.status(200).json({
        status: 'success',
        data: {
          idiom: result.rows[0],
        },
      });
    } catch (error) {
      console.error('Error executing delete query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);

// Add examples to an idiom
app.post(
  '/api/v1/idioms/:id/examples',
  jwtCheck,
  checkRole('Admin'),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { example } = req.body;

    try {
      const insertQuery = `
      INSERT INTO idiom_examples (idiom_id, example)
      VALUES ($1, $2)
      RETURNING example_id, idiom_id, example
    `;
      const result = await pool.query(insertQuery, [id, example]);
      res.status(200).json({
        status: 'success',
        data: {
          example: result.rows[0],
        },
      });
    } catch (error) {
      console.error('Error adding examples:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);

app.put(
  '/api/v1/idioms/:id/examples',
  jwtCheck,
  checkRole('Admin'),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { examples } = req.body;

    try {
      const updateQuery = `
      UPDATE idiom_examples 
      SET example = $1 
      WHERE example_id = $2 AND idiom_id = $3
    `;

      // Loop through each example and update it
      for (const { example_id, example } of examples) {
        await pool.query(updateQuery, [example, example_id, id]);
      }

      res.status(200).json({
        status: 'success',
        message: 'Examples updated successfully',
      });
    } catch (error) {
      console.error('Error updating examples:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);

// Delete an example
app.delete(
  '/api/v1/idioms/examples/:id',
  jwtCheck,
  checkRole('Admin'),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await pool.query(
        `
      DELETE FROM idiom_examples 
      WHERE example_id = $1
      RETURNING *
      `,
        [id],
      );
      res.status(200).json({
        status: 'success',
        message: 'Example deleted successfully',
        data: {
          example: result.rows[0],
        },
      });
    } catch (error) {
      console.error('Error deleting example:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});
