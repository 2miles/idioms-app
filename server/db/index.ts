import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

let pool: pkg.Pool;

pool = new Pool({
  connectionString: process.env.DB_URL_SUPABASE_DEV as string,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
