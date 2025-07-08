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
      const page = parseInt((req.query.page as string) || '1', 10);
      const limit = parseInt((req.query.limit as string) || '20', 10);
      const offset = (page - 1) * limit;

      const search = (req.query.search as string) || '';
      const searchPattern = `%${search}%`;

      // Fetch a paginated list of idioms ordered by newest first (timestamps DESC),
      // and assign each idiom a global position such that the newest idiom has the highest position.
      // For example, if there are 1080 idioms, the newest idiom will have position 1080, next 1079, etc.
      // This uses a CTE to first calculate the total number of idioms (with optional filtering via ILIKE),
      // then assigns a row number and converts it into the descending global position.
      const idiomsQuery = `
      WITH total AS (
        SELECT COUNT(*) AS total FROM idioms WHERE title ILIKE $3
      ),
      ranked AS (
        SELECT *,
          ROW_NUMBER() OVER (ORDER BY timestamps DESC) AS row_num
        FROM idioms
        WHERE title ILIKE $3
      )
      SELECT *,
        (SELECT total FROM total) + 1 - row_num AS position
      FROM ranked
      ORDER BY timestamps DESC
      LIMIT $1 OFFSET $2;
      `;

      const totalCountQuery = `
      SELECT COUNT(*) AS total FROM idioms
      WHERE title ILIKE $1
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
