// @ts-ignore
import Client from '../database';

export type Product = {
  id: number;
  name: string;
  price: number;
  category_id: number | null;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    let conn;
    try {
       // @ts-ignore
      conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      // Convert the price property of each product to a number
    const products: Product[] = result.rows.map((product: Product) => ({
      ...product,
      price: parseFloat(product.price.toString()),
    }));

    return products;
    } catch (error) {
      throw new Error(`Could not get products. Error: ${(error as Error).message}`);
    } finally {
        conn?.release();
    }
  }

  async show(id: string): Promise<Product> {
    let conn;
    try {
       // @ts-ignore
      conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];

    // Ensure that the price property is a number
    if (product ) {
      product.price = parseFloat(product.price.toString());
    }
      return product;
    } catch (error) {
      throw new Error(`Could not find product ${id}. Error: ${(error as Error).message}`);
    } finally {
      conn?.release();
    }
  }

  async create(product: Product): Promise<Product> {
    let conn;
    try {
       // @ts-ignore
      conn = await Client.connect();
      const sql =
        'INSERT INTO products (id,name, price, category_id) VALUES($1, $2, $3,$4) RETURNING *';
        const result = await conn.query(sql, [
          product.id,
          product.name,
          parseFloat(product.price.toString()), // Convert price to number
          product.category_id,
        ]);

        const insertedProduct  = result.rows[0];
        if (product ) {
          product.price = parseFloat(product.price.toString());
        }

      return insertedProduct;
    } catch (error) {
      throw new Error(`Could not add new product ${product.name}. Error: ${(error as Error).message}`);
    } finally {
      conn?.release();
    }
  }
  async update(id: number, updates: Partial<Product>): Promise<Product> {
    let conn;
    try {
       // @ts-ignore
      conn = await Client.connect();
      const sql =
        'UPDATE products SET name = $1, price = $2, category_id = $3 WHERE id = $4 RETURNING *';
      const result = await conn.query(sql, [
        updates.name,
        updates.price,
        updates.category_id,
        id,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to update product ${id}. Error: ${(error as Error).message}`);
    } finally {
      if (conn) {
        if (typeof conn.release === 'function') {
          conn.release();
        }
      }
    }
  }
  async delete(id: number): Promise<Product> {
    let conn;
    try {
       // @ts-ignore
      conn = await Client.connect();
      const sql = 'DELETE FROM products WHERE id = $1 RETURNING *';
      const result = await conn.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to delete product ${id}. Error: ${(error as Error).message}`);
    } finally {
      if (conn) {
        if (typeof conn.release === 'function') {
          conn.release();
        }
      }
    }
  }
  async getTop5PopularProducts(): Promise<Product[]> {
    let conn;
    try {
       // @ts-ignore
      conn = await Client.connect();
      const sql =
        'SELECT p.id, p.name, p.price, p.category_id FROM products p ' +
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

  async getProductsByCategory(category: number): Promise<Product[]> {
    let conn;
    try {
        // @ts-ignore
      conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE category_id = $1';
      const result = await conn.query(sql, [category]);
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get products by category. Error: ${(error as Error).message}`);
    } finally {
      conn?.release();
    }
  }

  
}
