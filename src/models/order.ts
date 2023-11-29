import Client from '../database';

export type Order = {
  id: number;
  productId: number;
  quantity: number;
  userId: number;
  status: 'active' | 'complete';
};

export class OrderModel {
  async index(): Promise<Order[]> {
    let conn;
    try {
      conn = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`Failed to fetch orders. Error: ${(error as Error).message}`);
    } finally {
      if (conn) {
        if (typeof conn.release === 'function') {
          conn.release();
        }
      }
    }
  }

  async show(id: string): Promise<Order> {
    let conn;
    try {
      conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to find order ${id}. Error: ${(error as Error).message}`);
    } finally {
      if (conn) {
        if (typeof conn.release === 'function') {
          conn.release();
        }
      }
    }
  }

  async create(order: Omit<Order, 'id'>): Promise<Order> {
    let conn;
    try {
      conn = await Client.connect();
      const sql =
        'INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(sql, [order.productId, order.quantity, order.userId, order.status]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to add new order. Error: ${(error as Error).message}`);
    } finally {
      if (conn) {
        if (typeof conn.release === 'function') {
          conn.release();
        }
      }
    }
  }
  async getCurrentOrderByUser(userId: string): Promise<Order | null> {
    let conn;
    try {
      conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id = $1 AND status = $2';
      const result = await conn.query(sql, [userId, 'active']);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Failed to fetch current order for user ${userId}. Error: ${(error as Error).message}`);
    } finally {
      if (conn) {
        if (typeof conn.release === 'function') {
          conn.release();
        }
      }
    }
  }

  async getCompletedOrdersByUser(userId: string): Promise<Order[]> {
    let conn;
    try {
      conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id = $1 AND status = $2';
      const result = await conn.query(sql, [userId, 'complete']);
      return result.rows;
    } catch (error) {
      throw new Error(`Failed to fetch completed orders for user ${userId}. Error: ${(error as Error).message}`);
    } finally {
      if (conn) {
        if (typeof conn.release === 'function') {
          conn.release();
        }
      }
    }
  }
}
