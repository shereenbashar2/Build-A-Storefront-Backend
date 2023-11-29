"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class CategoryModel {
    async index() {
        let conn;
        try {
            // @ts-ignore
            conn = await database_1.default.connect();
            const sql = 'SELECT * FROM categories';
            const result = await conn.query(sql);
            return result.rows;
        }
        catch (error) {
            throw new Error(`Failed to fetch categories. Error: ${error.message}`);
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
            const sql = 'SELECT * FROM categories WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to find category ${id}. Error: ${error.message}`);
        }
        finally {
            if (conn) {
                if (typeof conn.release === 'function') {
                    conn.release();
                }
            }
        }
    }
    async create(category) {
        let conn;
        try {
            // @ts-ignore
            conn = await database_1.default.connect();
            const sql = 'INSERT INTO categories (name, description) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [category.name, category.description]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to add new category ${category.name}. Error: ${error.message}`);
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
exports.CategoryModel = CategoryModel;
