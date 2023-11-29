// @ts-ignore
import Client from '../database';

export type Category = {
  id: number;
  name: string;
  description?: string; // Optional, as per your data shape
};

export class CategoryModel {
  async index(): Promise<Category[]> {
    let conn;
    try {
         // @ts-ignore
      conn = await Client.connect();
      const sql = 'SELECT * FROM categories';
      const result = await conn.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`Failed to fetch categories. Error: ${(error as Error).message}`);
    } finally {
      if (conn) {
        if (typeof conn.release === 'function') {
          conn.release();
        }
      }
    }
  }

  async show(id: string): Promise<Category> {
    let conn;
    try {
         // @ts-ignore
      conn = await Client.connect();
      const sql = 'SELECT * FROM categories WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to find category ${id}. Error: ${(error as Error).message}`);
    } finally {
      if (conn) {
        if (typeof conn.release === 'function') {
          conn.release();
        }
      }
    }
  }
  async create(category: Omit<Category, 'id'>): Promise<Category> {
    let conn;
    try {
         // @ts-ignore
      conn = await Client.connect();
      const sql = 'INSERT INTO categories (name, description) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [category.name, category.description]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to add new category ${category.name}. Error: ${(error as Error).message}`);
    } finally {
      if (conn) {
        if (typeof conn.release === 'function') {
          conn.release();
        }
      }
    }
  }

  // Add other methods as needed, such as update and delete
}
