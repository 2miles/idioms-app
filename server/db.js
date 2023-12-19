const { Pool } = require('pg');

const pool = new Pool({
  // user: 'postgres',        // Replace with your PostgreSQL username
  // host: 'localhost',
  // database: 'idioms_db',    // Replace with your PostgreSQL database name
  // password: 'postgres',    // Replace with your PostgreSQL password
  // port: 5433,
});

module.exports = pool;