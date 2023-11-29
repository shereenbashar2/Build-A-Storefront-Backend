-- SQL for creating the users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR,
  lastName VARCHAR,
  password VARCHAR
);
