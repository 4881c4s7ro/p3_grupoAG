import pool from '../config/db.js';

// Busca un usuario en la base de datos por su email
export const getUserByEmail = async (email) => {
    const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE email = ? AND activo = 1',
        [email]
    );

    // Si lo encuentra devuelve el usuario (fila 0), si no, devuelve undefined
    return rows[0];
};