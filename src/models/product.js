"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        let conn;
        try {
            // @ts-ignore
            conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get products. Error: ${error.message}`);
        }
        finally {
            conn?.release();
        }
    }
    async show(id) {
        let conn;
        try {
            // @ts-ignore
            conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not find product ${id}. Error: ${error.message}`);
        }
        finally {
            conn?.release();
        }
    }
    async create(product) {
        let conn;
        try {
            // @ts-ignore
            conn = await database_1.default.connect();
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [product.name, product.price, product.category]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not add new product ${product.name}. Error: ${error.message}`);
        }
        finally {
            conn?.release();
        }
    }
    async update(id, updates) {
        let conn;
        try {
            // @ts-ignore
            conn = await database_1.default.connect();
            const sql = 'UPDATE products SET name = $1, price = $2, category = $3 WHERE id = $4 RETURNING *';
            const result = await conn.query(sql, [
                updates.name,
                updates.price,
                updates.category,
                id,
            ]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to update product ${id}. Error: ${error.message}`);
        }
        finally {
            if (conn) {
                if (typeof conn.release === 'function') {
                    conn.release();
                }
            }
        }
    }
    async delete(id) {
        let conn;
        try {
            // @ts-ignore
            conn = await database_1.default.connect();
            const sql = 'DELETE FROM products WHERE id = $1 RETURNING *';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to delete product ${id}. Error: ${error.message}`);
        }
        finally {
            if (conn) {
                if (typeof conn.release === 'function') {
                    conn.release();
                }
            }
        }
    }
    async getTop5PopularProducts() {
        let conn;
        try {
            // @ts-ignore
            conn = await database_1.default.connect();
            const sql = 'SELECT p.id, p.name, p.price, p.category FROM products p ' +
                'JOIN orders o ON p.id = o.product_id ' +
                'GROUP BY p.id ' +
                'ORDER BY SUM(o.quantity) DESC ' +
                'LIMIT 5';
            const result = await conn.query(sql);
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get top 5 popular products. Error: ${error.message}`);
        }
        finally {
            conn?.release();
        }
    }
    async getProductsByCategory(category) {
        let conn;
        try {
            // @ts-ignore
            conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE category = $1';
            const result = await conn.query(sql, [category]);
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get products by category. Error: ${error.message}`);
        }
        finally {
            conn?.release();
        }
    }
}
exports.ProductStore = ProductStore;
