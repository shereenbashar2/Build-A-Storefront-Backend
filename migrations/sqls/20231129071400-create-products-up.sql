-- SQL for creating the products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  price DECIMAL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE ON UPDATE RESTRICT
);

