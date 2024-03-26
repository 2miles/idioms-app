const express = require('express');
const pool = require('./db');
require("dotenv").config();
const morgan = require("morgan");

// Allows different domain 
const cors = require('cors') 

const app = express();

const port = process.env.PORT || 3001;

// Middleware
// Functions to be invoked in between the request and the response

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Get all idioms
// This line defines a route for handling HTTP GET requests to the /api/v1/idioms endpoint.
// Returns the data itself and the number of items returned in the response
app.get('/api/v1/idioms', async (req, res) => { // This is the route handler
  try {
    const result = await pool.query(
      `
      SELECT * FROM idioms_test
      ORDER BY day
      `); // pool.query returns a promise
    res.status(200).json( { // sends a JSON response back to the client containing the rows from db
        status: "success",
        results: result.rows.length,
        data: {
          idioms: result.rows
        }
      }
    ); 
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get single idiom
// Route for handling HTTP GET requests to /api/v1/idioms/:id
// Return the added idiom in the response
app.get('/api/v1/idioms/:id', async (req, res) => { 
  try {
    // Parameterized query
    const result = await pool.query(
      `
      SELECT * FROM idioms_test
      WHERE id = $1
      `,
      [req.params.id]);
    res.status(200).json( { 
        status: "success",
        data: {
          idiom: result.rows[0]
        }
      }
    ); 
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create an idiom
// Route for handling HTTP POST requests to /api/v1/idioms/
// Return the added idiom in the response
app.post('/api/v1/idioms/', async (req, res) => { 
  try {
    const result = await pool.query(
      `
      INSERT INTO idioms_test (title_old, title_new, definition, day, owner)
      values ($1, $2, $3, $4, $5)
      returning *
      `,
      [req.body.title_old, req.body.title_new, req.body.definition, req.body.day, req.body.owner]);
    res.status(200).json( { 
        status: "success",
        data: {
          idiom: result.rows[0]
        }
      }
    ); 
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an idiom
// Route for handling HTTP PUT requests to /api/v1/idioms/:id endpoint
// Return the updated idiom in the response
app.put('/api/v1/idioms/:id', async (req, res) => { 
  try {
    const result = await pool.query(
      `
      UPDATE idioms_test 
      SET title_old = $1, title_new = $2, definition = $3, day = $4, owner = $5
      WHERE id = $6 
      returning *
      `, 
      [req.body.title_old, req.body.title_new, req.body.definition, req.body.day, req.body.owner, req.params.id]);
    res.status(200).json( { 
        status: "success",
        data: {
          idiom: result.rows[0]
        }
      }
    ); 
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an idiom
// Route for handling HTTP DELETE requests to /api/v1/idioms/:id
// Return the deleted idiom in the response
app.delete('/api/v1/idioms/:id', async (req, res) => { 
  try {
    const result = await pool.query(
      `
      DELETE FROM idioms_test 
      WHERE id = $1`,
      [req.params.id]);
    res.status(200).json( { 
        status: "success",
        data: {
          idiom: result.rows[0]
        }
      }
    ); 
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// module.exports = {
//   query: (text, params) => pool.query(text, params)
// };



pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

// pool.on('error', (err) => {
//   console.error('Error connecting to PostgreSQL database:', err);
// });


