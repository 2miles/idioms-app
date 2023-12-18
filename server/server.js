const express = require('express');
const pool = require('./db'); // Path to your db.js file
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM idioms'); // Replace with your actual SQL query
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// const express = require('express');
// const { Pool } = require('pg');
// const app = express();
// const port = 3001;

// const pool = new Pool({
//   user: 'postgres',        // Replace with your PostgreSQL username
//   host: 'localhost',
//   database: 'idioms_db',    // Replace with your PostgreSQL database name
//   password: 'postgres',    // Replace with your PostgreSQL password
//   port: 5433,
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params)
// };

// app.use(express.json());

// pool.on('connect', () => {
//   console.log('Connected to PostgreSQL database');
// });

// pool.on('error', (err) => {
//   console.error('Error connecting to PostgreSQL database:', err);
// });


// // Define CRUD routes

// app.get('/', (req, res) => {
//   res.send('Hello, this is your Express server with PostgreSQL!');
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });