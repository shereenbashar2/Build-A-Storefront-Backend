"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class UserModel {
    async index() {
        let conn;
        try {
            // @ts-ignore
            conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            return result.rows;
        }
        catch (error) {
            throw new Error(`Failed to fetch users. Error: ${error.message}`);
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
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to find user ${id}. Error: ${error.message}`);
        }
        finally {
            if (conn) {
                if (typeof conn.release === 'function') {
                    conn.release();
                }
            }
        }
    }
    async create(user) {
        let conn;
        try {
            // @ts-ignore
            conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [user.firstName, user.lastName, user.password]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to add new user ${user.firstName}. Error: ${error.message}`);
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
exports.UserModel = UserModel;
