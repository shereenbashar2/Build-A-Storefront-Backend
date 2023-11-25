/* Replace with your SQL commands */
CREATE TABLE Products (
  product_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(255)
);