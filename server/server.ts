import express, { Request, Response } from 'express'; // Express import and type definitions
import dotenv from 'dotenv'; // Environment variable configuration
import morgan from 'morgan'; // HTTP request logger
import cors from 'cors'; // Cross-Origin Resource Sharing
import { jwtCheck } from './authMiddleware'; // JWT authentication middleware
import { checkRole } from './authMiddleware'; // Role-checking middleware
import pool from './db/index'; // Database connection pool

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

// Get all idioms and examples
// Returns the data and the number of idioms returned.
app.get('/api/v1/idioms', async (_: Request, res: Response) => {
  try {
    const idiomsQuery = `SELECT * FROM idioms_test ORDER BY timestamps`;
    const examplesQuery = `SELECT * FROM idioms_examples_test`;

    const [idiomsResult, examplesResult] = await Promise.all([
      pool.query(idiomsQuery),
      pool.query(examplesQuery),
    ]);

    res.status(200).json({
      status: 'success',
      results: idiomsResult.rows.length,
      data: {
        idioms: idiomsResult.rows,
        examples: examplesResult.rows,
      },
    });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get single idiom, and get examples for that idiom
app.get('/api/v1/idioms/:id', async (req: Request, res: Response) => {
  try {
    const idiomQuery = await pool.query(
      ` SELECT * FROM idioms_test WHERE id = $1 `,
      [req.params.id],
    );
    const examplesQuery = await pool.query(
      `SELECT * FROM idioms_examples_test WHERE idiom_id = $1`,
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
      INSERT INTO idioms_test (title, title_general, definition, timestamps, contributor)
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
      UPDATE idioms_test 
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

// Delete an idiom
app.delete(
  '/api/v1/idioms/:id',
  jwtCheck,
  checkRole('Admin'),
  async (req: Request, res: Response) => {
    try {
      const deleteQuery = `
      DELETE FROM idioms_test 
      WHERE id = $1
    `;
      const result = await pool.query(deleteQuery, [req.params.id]);
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
      INSERT INTO idioms_examples_test (idiom_id, example)
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
      UPDATE idioms_examples_test 
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
      DELETE FROM idioms_examples_test
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
