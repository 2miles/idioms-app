import express, { Request, Response } from 'express';
import pool from './db/index.ts';
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
// Returns the data itself and the number of items returned in the response
app.get('/api/v1/idioms', async (_: Request, res: Response) => {
  try {
    const selectQuery = `
      SELECT * FROM idioms_test
      ORDER BY timestamps
    `;
    const result = await pool.query(selectQuery);
    res.status(200).json({
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
app.post('/api/v1/idioms/', async (req: Request, res: Response) => {
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
});

// Update an idiom
app.put('/api/v1/idioms/:id', async (req: Request, res: Response) => {
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
});

// Delete an idiom
app.delete('/api/v1/idioms/:id', async (req: Request, res: Response) => {
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
});

// Add examples for an idiom
app.post('/api/v1/idioms/:id/examples', async (req: Request, res: Response) => {
  const { id } = req.params; // Extract idiomId from the URL parameters
  const { example } = req.body; // Extract examples array from the request body

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
});

app.put('/api/v1/idioms/:id/examples', async (req, res) => {
  const { id } = req.params; // Extract idiom ID from URL params
  const { examples } = req.body; // Array of examples to update

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
});

// // Delete an example
// // Route for handling HTTP DELETE requests to /api/v1/examples/:id
// app.delete('/api/v1/examples/:id', async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params; // Extract example_id from the URL parameters
//     const result = await pool.query(
//       `
//       DELETE FROM idioms_examples_test
//       WHERE example_id = $1
//       RETURNING *
//       `,
//       [id],
//     );
//     // Log the full result object to inspect it
//     console.log('Full result:', result);

//     // Log only the rows array to see its structure
//     console.log('Result rows:', result.rows);

//     res.status(200).json({
//       status: 'success',
//       message: 'Example deleted successfully',
//       data: {
//         example: result.rows[0],
//       },
//     });
//   } catch (error) {
//     console.error('Error deleting example:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});
