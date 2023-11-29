"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class OrderModel {
    async index() {
        let conn;
        try {
            // @ts-ignore
            conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            return result.rows;
        }
        catch (error) {
            throw new Error(`Failed to fetch orders. Error: ${error.message}`);
        }
        finally {
            if (conn) {
                if (typeof conn.release === 'function') {
                    conn.release();
                }
            }
        }
    }
    async show(id) {
        let conn;
        try {
            // @ts-ignore
            conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to find order ${id}. Error: ${error.message}`);
        }
        finally {
            if (conn) {
                if (typeof conn.release === 'function') {
                    conn.release();
                }
            }
        }
    }
    async create(order) {
        let conn;
        try {
            // @ts-ignore
            conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *';
            const result = await conn.query(sql, [order.productId, order.quantity, order.userId, order.status]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to add new order. Error: ${error.message}`);
        }
        finally {
            if (conn) {
                if (typeof conn.release === 'function') {
                    conn.release();
                }
            }
        }
    }
    async getCurrentOrderByUser(userId) {
        let conn;
        try {
            // @ts-ignore
            conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id = $1 AND status = $2';
            const result = await conn.query(sql, [userId, 'active']);
            return result.rows[0] || null;
        }
        catch (error) {
            throw new Error(`Failed to fetch current order for user ${userId}. Error: ${error.message}`);
        }
        finally {
            if (conn) {
                if (typeof conn.release === 'function') {
                    conn.release();
                }
            }
        }
    }
    async getCompletedOrdersByUser(userId) {
        let conn;
        try {
            // @ts-ignore
            conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id = $1 AND status = $2';
            const result = await conn.query(sql, [userId, 'complete']);
            return result.rows;
        }
        catch (error) {
            throw new Error(`Failed to fetch completed orders for user ${userId}. Error: ${error.message}`);
        }
        finally {
            if (conn) {
                if (typeof conn.release === 'function') {
                    conn.release();
                }
            }
        }
    }
}
exports.OrderModel = OrderModel;
