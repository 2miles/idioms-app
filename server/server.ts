import express, { Request, Response } from 'express';
import pool from './db/index.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

const app = express();

const port = parseInt(process.env.PORT || '3001', 10);

// Middleware
// Functions to be invoked in between the request and the response
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Get all idioms
// This line defines a route for handling HTTP GET requests to the /api/v1/idioms endpoint.
// Returns the data itself and the number of items returned in the response
app.get('/api/v1/idioms', async (_: Request, res: Response) => {
  // This is the route handler
  try {
    const result = await pool.query(
      `
      SELECT * FROM idioms_test
      ORDER BY timestamps
      `,
    ); // pool.query returns a promise
    res.status(200).json({
      // sends a JSON response back to the client containing the rows from db
      status: 'success',
      results: result.rows.length,
      data: {
        idioms: result.rows,
      },
    });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get single idiom, and get examples for that idiom
// Route for handling HTTP GET requests to /api/v1/idioms/:id
// Return the added idiom, and its examples in the response
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
// Route for handling HTTP POST requests to /api/v1/idioms/
// Return the added idiom in the response
app.post('/api/v1/idioms/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `
      INSERT INTO idioms_test (title, title_general, definition, timestamps, contributor)
      values ($1, $2, $3, $4, $5)
      returning *
      `,
      [
        req.body.title,
        req.body.title_general,
        req.body.definition,
        req.body.timestamps,
        req.body.contributor,
      ],
    );
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
});

// Update an idiom
// Route for handling HTTP PUT requests to /api/v1/idioms/:id endpoint
// Return the updated idiom in the response
app.put('/api/v1/idioms/:id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `
      UPDATE idioms_test 
      SET title = $1, title_general = $2, definition = $3, timestamps = $4, contributor = $5
      WHERE id = $6 
      returning *
      `,
      [
        req.body.title,
        req.body.title_general,
        req.body.definition,
        req.body.timestamps,
        req.body.contributor,
        req.params.id,
      ],
    );
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
});

// Delete an idiom
// Route for handling HTTP DELETE requests to /api/v1/idioms/:id
// Return the deleted idiom in the response
app.delete('/api/v1/idioms/:id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `
      DELETE FROM idioms_test 
      WHERE id = $1`,
      [req.params.id],
    );
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
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});
