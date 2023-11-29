// database.ts
import dotenv from 'dotenv';

import { Pool } from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_PASSWORD,
    POSTGRES_USER,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_PORT,
    ENV,
} = process.env as {
    POSTGRES_HOST: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_USER: string;
    POSTGRES_DB: string;
    POSTGRES_TEST_DB:string
    POSTGRES_PORT: string;
    ENV:string
};

// Log connection details for debugging
console.log('Connecting to PostgreSQL with the following details:');
console.log(`Host: ${POSTGRES_HOST}`);
console.log(`User: ${POSTGRES_USER}`);
console.log(`Database: ${POSTGRES_DB}`);
console.log(`Port: ${POSTGRES_PORT}`);
console.log(`Database Test: ${POSTGRES_TEST_DB}`);

let pool;
if(ENV === 'ENV') {
  pool = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: parseInt(POSTGRES_PORT, 10),
  })
}

if(ENV === 'dev') {
  pool = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: parseInt(POSTGRES_PORT, 10),

  })
}



export default pool;
