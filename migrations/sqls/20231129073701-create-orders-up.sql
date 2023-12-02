-- SQL for creating the orders table

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE ON UPDATE RESTRICT,
  quantity INTEGER,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE RESTRICT,
  status VARCHAR(10) CHECK (status IN ('active', 'complete'))
);
