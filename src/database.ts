// database.ts
import dotenv from 'dotenv';

import { Pool } from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_PASSWORD,
    POSTGRES_USER,
    POSTGRES_DB,
    POSTGRES_PORT,
} = process.env as {
    POSTGRES_HOST: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_USER: string;
    POSTGRES_DB: string;
    POSTGRES_PORT: string;
};

// Log connection details for debugging
console.log('Connecting to PostgreSQL with the following details:');
console.log(`Host: ${POSTGRES_HOST}`);
console.log(`User: ${POSTGRES_USER}`);
console.log(`Database: ${POSTGRES_DB}`);
console.log(`Port: ${POSTGRES_PORT}`);

const pool = new Pool({
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: parseInt(POSTGRES_PORT, 10),
//   max: 20, // Adjust based on your application's needs
//   idleTimeoutMillis: 30000, // Adjust based on your application's needs
//   connectionTimeoutMillis: 2000, // Adjust based on your application's needs
});

// Handle connection events
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

pool.on('remove', () => {
  console.log('Client removed from pool');
});

export default pool;
