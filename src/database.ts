// database.ts
import dotenv from 'dotenv';

import { Pool } from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_PASSWORD,
    POSTGRES_USER,
    POSTGRES_DB,
    POSTGRES_NAME_TEST,
    POSTGRES_PORT,
    ENV,
} = process.env as {
    POSTGRES_HOST: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_USER: string;
    POSTGRES_DB: string;
    POSTGRES_NAME_TEST:string
    POSTGRES_PORT: string;
    ENV:string
};



const environment = ENV.trim().toLowerCase(); // Convert to lowercase and trim whitespaces
console.log(`${environment}`);
let pool;
if (environment === 'test') {
  console.log(`Database: ${POSTGRES_NAME_TEST}`);
  pool = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_NAME_TEST, // Use POSTGRES_NAME_TEST for the test environment
    password: POSTGRES_PASSWORD,
    port: parseInt(POSTGRES_PORT, 10),
  });
} else if (environment === 'dev') {
  console.log(`Database: ${POSTGRES_DB}`);
  pool = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: parseInt(POSTGRES_PORT, 10),
  });
} else {
  console.error(`Invalid environment: ${environment}`);
}

export default pool;
