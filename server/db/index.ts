import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();
console.log('DATABASE_URL_TEST:', process.env.DATABASE_URL_TEST);

let pool: pkg.Pool;
const env = process.env.NODE_ENV;

let connectionString: string;

if (env === 'test') {
  connectionString = process.env.DATABASE_URL_TEST as string;
} else {
  connectionString = process.env.DATABASE_URL_DEV as string;
}

console.log('ENV:', env);
console.log('Connecting to DB:', connectionString);

pool = new Pool({
  connectionString,
  ssl: false, // you're local, so you don't need SSL
});

export default pool;
