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

  async show(id: number): Promise<Category> {
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
  async create(category: Category): Promise<Category> {
    let conn;
    try {
         // @ts-ignore
      conn = await Client.connect();
      const sql = 'INSERT INTO categories (id,name, description) VALUES($1, $2,$3) RETURNING *';
      const result = await conn.query(sql, [category.id,category.name, category.description]);
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
  async update(id: number, updatedCategory: Category): Promise<Category> {
    let conn;

     try {
           // @ts-ignore
    conn = await Client.connect();
    const sql = 'UPDATE categories SET name = $2, description = $3 WHERE id = $1 RETURNING *';
    const result = await conn.query(sql, [id, updatedCategory.name, updatedCategory.description]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Failed to update category ${id}. Error: ${(error as Error).message}`);

  } finally {
    if (conn) {
      if (typeof conn.release === 'function') {
        conn.release();
      }
    }
  }
  }

  async delete(id: number): Promise<Category> {
    let conn;
    try {
           // @ts-ignore
      conn = await Client.connect();
      const sql = 'DELETE FROM categories WHERE id = $1 RETURNING *';
      const result = await conn.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to delete category ${id}. Error: ${(error as Error).message}`)
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }
  
}
