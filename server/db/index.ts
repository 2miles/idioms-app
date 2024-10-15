import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool: Pool;

if (process.env.USE_SUPABASE === 'true') {
  pool = new Pool({
    connectionString: process.env.DB_URL_SUPABASE as string,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  pool = new Pool({
    host: process.env.LOCAL_PSQL_HOST as string,
    port: parseInt(process.env.LOCAL_PSQL_PORT as string, 10),
    user: process.env.LOCAL_PSQL_USER as string,
    password: process.env.LOCAL_PSQL_PASSWORD as string,
    database: process.env.LOCAL_PSQL_DATABASE as string,
  });
}

module.exports = pool;
