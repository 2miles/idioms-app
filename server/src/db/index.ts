import dotenv from 'dotenv';
import pkg from 'pg';

const { Pool } = pkg;

dotenv.config();

let pool: pkg.Pool;
const env = process.env.NODE_ENV;

let connectionString: string;

if (env === 'test') {
  connectionString = process.env.DATABASE_URL_TEST as string;
} else {
  // Use DATABASE_URL_DEV locally, but fallback to DATABASE_URL in prod (e.g., Railway)
  connectionString = process.env.DATABASE_URL_DEV || (process.env.DATABASE_URL as string);
}

console.log('ENV:', env);
console.log('Connecting to DB:', connectionString);

pool = new Pool({
  connectionString,
  ssl: false, // you're local, so you don't need SSL
});

export default pool;
