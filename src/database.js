"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// database.ts
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_DB, POSTGRES_TEST_DB, POSTGRES_PORT, ENV, } = process.env;
// Log connection details for debugging
console.log('Connecting to PostgreSQL with the following details:');
console.log(`Host: ${POSTGRES_HOST}`);
console.log(`User: ${POSTGRES_USER}`);
console.log(`Database: ${POSTGRES_DB}`);
console.log(`Port: ${POSTGRES_PORT}`);
console.log(`Database Test: ${POSTGRES_TEST_DB}`);
let pool;
if (ENV === 'ENV') {
    pool = new pg_1.Pool({
        user: POSTGRES_USER,
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        password: POSTGRES_PASSWORD,
        port: parseInt(POSTGRES_PORT, 10),
    });
}
if (ENV === 'dev') {
    pool = new pg_1.Pool({
        user: POSTGRES_USER,
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        password: POSTGRES_PASSWORD,
        port: parseInt(POSTGRES_PORT, 10),
    });
}
exports.default = pool;
