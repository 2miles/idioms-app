 // Im not sure exactly why this is in its own file and not just at the top of server.js

const { Pool } = require('pg');
 // The pg library is commonly used with Node.js for interacting with PostgreSQL databases.
 // Pool is a pg class that manages a pool of client connections to the database.
const pool = new Pool();
module.exports = pool;
