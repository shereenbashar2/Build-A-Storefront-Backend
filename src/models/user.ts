// @ts-ignore
import bcrypt from 'bcrypt';
// @ts-ignore
import Client from '../database';


export interface BaseUser {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface User extends BaseUser {
  id: number;
}

export class UserModel {
  private saltRounds: number;

  constructor() {
    // Read SALT_ROUNDS from the environment variable or provide a default value
    this.saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
  }

  async index(token: string): Promise<User[]> {
    // Implement token authentication logic here if needed
    // For example, verify the token against a stored list of valid tokens
    let conn; 
    try {
      // @ts-ignore
       conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      const users: User[] = result.rows;
      conn.release();
      return users;
    } catch (error) {
      throw new Error(`Unable to retrieve users. Error: ${(error as Error).message}`);
    }
    finally {
      if (conn) {
        conn.release();
      }
    }
  }

  async show(id: number, token: string): Promise<User | null> {
    // Implement token authentication logic here if needed
    let conn; 
    try {
      // @ts-ignore
       conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id = $1';
      const result = await conn.query(sql, [id]);
      const user: User | null = result.rows[0] || null;
      conn.release();
      return user;
    } catch (error) {
      throw new Error(`Unable to retrieve user ${id}. Error: ${(error as Error).message}`);
    }
    finally {
      if (conn) {
        conn.release();
      }
    }
  }

  async create(newUser: BaseUser, token: string): Promise<User> {
    // Implement token authentication logic here if needed
    let conn; 
    try {
      // @ts-ignore
       conn = await Client.connect();
      const sql = 'INSERT INTO users (firstName, lastName, username, password) VALUES($1, $2, $3, $4) RETURNING *';
      const hash = bcrypt.hashSync(newUser.password,this.saltRounds); // Using 10 salt rounds for hashing
      const result = await conn.query(sql, [newUser.firstName, newUser.lastName, newUser.username, hash]);
      const createdUser: User = result.rows[0];
      conn.release();
      return createdUser;
    } catch (error) {
      throw new Error(`Unable to create user ${newUser.username}. Error: ${(error as Error).message}`);
    }
    finally {
      if (conn) {
        conn.release();
      }
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    let conn; 
    try {
      // @ts-ignore
       conn = await Client.connect();
      const sql = 'SELECT id, password FROM users WHERE username = $1';
      const result = await conn.query(sql, [username]);

      if (result.rows.length > 0) {
        const user = result.rows[0];

        if (bcrypt.compareSync(password, user.password)) {
          // Omit the password in the response
          const authenticatedUser: User = {
            id: user.id,
            firstName: '',
            lastName: '',
            username: username,
            password: '',
          };

          return authenticatedUser;
        }
      }

      return null;
    } catch (error) {
      throw new Error(`Authentication error for user ${username}. Error: ${(error as Error).message}`);
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }
}
