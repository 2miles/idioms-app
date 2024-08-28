const { Pool } = require('pg');
require('dotenv').config();

let pool;

if (process.env.USE_SUPABASE === 'true') {
  pool = new Pool({
    connectionString: process.env.DB_URL_SUPABASE,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  pool = new Pool({
    host: process.env.LOCAL_PSQL_HOST,
    port: process.env.LOCAL_PSQL_PORT,
    user: process.env.LOCAL_PSQL_USER,
    password: process.env.LOCAL_PSQL_PASSWORD,
    database: process.env.LOCAL_PSQL_DATABASE,
  });
}

module.exports = pool;
