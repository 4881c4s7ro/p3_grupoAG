import pool from '../config/db.js';

// Buscar usuario activo por email
export const getUserByEmail = async (email) => {

    const [rows] = await pool.query(
        `SELECT *
         FROM usuarios
         WHERE email = ?
         AND activo = 1`,
        [email]
    );

    return rows[0];
};