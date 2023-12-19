const express = require('express');
const pool = require('./db');
require("dotenv").config();
const morgan = require("morgan");

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan("dev"));

// Get all idioms
// This line defines a route for handling HTTP GET requests to the /api/v1/idioms endpoint.
app.get('/api/v1/idioms', async (req, res) => { // This is the route handler
  try {
    const result = await pool.query('SELECT * FROM idioms_test'); // pool.query returns a promise
    res.json(result.rows); // sends a JSON response back to the client containing the rows from db
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get single idiom
app.get('/api/v1/idioms/:id', (req, res) => {
  console.log(req)
})

// Create an idiom
app.post('/api/v1/idioms', (req, res) => {
  console.log(req)
})

console.log("bro");

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