import Client from '../database';

export type Product = {
  id: number;
  name: string;
  price: number;
  category?: string; // Optional, as per your data shape
};

export class ProductStore {
  async index(): Promise<Product[]> {
    let conn;
    try {
      conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get products. Error: ${(error as Error).message}`);
    } finally {
        conn?.release();
    }
  }

  async show(id: string): Promise<Product> {
    let conn;
    try {
      conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find product ${id}. Error: ${(error as Error).message}`);
    } finally {
      conn?.release();
    }
  }

  async create(product: Omit<Product, 'id'>): Promise<Product> {
    let conn;
    try {
      conn = await Client.connect();
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [product.name, product.price, product.category]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not add new product ${product.name}. Error: ${(error as Error).message}`);
    } finally {
      conn?.release();
    }
  }

  async getTop5PopularProducts(): Promise<Product[]> {
    let conn;
    try {
      conn = await Client.connect();
      const sql =
        'SELECT p.id, p.name, p.price, p.category FROM products p ' +
        'JOIN orders o ON p.id = o.product_id ' +
        'GROUP BY p.id ' +
        'ORDER BY SUM(o.quantity) DESC ' +
        'LIMIT 5';
      const result = await conn.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get top 5 popular products. Error: ${(error as Error).message}`);
    } finally {
      conn?.release();
    }
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    let conn;
    try {
      conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE category = $1';
      const result = await conn.query(sql, [category]);
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get products by category. Error: ${(error as Error).message}`);
    } finally {
      conn?.release();
    }
  }
}
