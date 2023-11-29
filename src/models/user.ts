import Client from '../database';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  password: string; // Note: Password should be securely hashed in a real-world application
};

export class UserModel {
  async index(): Promise<User[]> {
    let conn;
    try {
      conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`Failed to fetch users. Error: ${(error as Error).message}`);
    } finally {
      if (conn) {
        if (typeof conn.release === 'function') {
          conn.release();
        }
      }
    }
  }

  async show(id: string): Promise<User> {
    let conn;
    try {
      conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to find user ${id}. Error: ${(error as Error).message}`);
    } finally {
      if (conn) {
        if (typeof conn.release === 'function') {
          conn.release();
        }
      }
    }
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    let conn;
    try {
      conn = await Client.connect();
      const sql =
        'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [user.firstName, user.lastName, user.password]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to add new user ${user.firstName}. Error: ${(error as Error).message}`);
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
