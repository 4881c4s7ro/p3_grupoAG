import pool from '../config/db.js';

// Trae todos los usuarios que esten activos
export const getAll = async () => {

    const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE activo = 1'
    );

    return rows;
};

// Busca un usuario por id
export const getById = async (id) => {

    const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE id_usuario = ? AND activo = 1',
        [id]
    );

    // Devuelve solamente el primer resultado
    return rows[0];
};

// Inserta un nuevo usuario
// Inserta un nuevo usuario
export const create = async (usuario) => {

    const {
        documento,
        apellido,
        nombres,
        email,
        contrasenia,
        foto_path,
        rol
    } = usuario;

    const [result] = await pool.query(
        `INSERT INTO usuarios
        (
            documento,
            apellido,
            nombres,
            email,
            contrasenia,
            foto_path,
            rol
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            documento,
            apellido,
            nombres,
            email,
            contrasenia,
            foto_path,
            rol
        ]
    );

    return result.insertId;
};

// Actualiza un usuario
// Actualiza un usuario
export const update = async (id, usuario) => {

    const {
        documento,
        apellido,
        nombres,
        email,
        contrasenia,
        foto_path,
        rol
    } = usuario;

    const [result] = await pool.query(
        `UPDATE usuarios
         SET documento = ?,
             apellido = ?,
             nombres = ?,
             email = ?,
             contrasenia = ?,
             foto_path = ?,
             rol = ?
         WHERE id_usuario = ?`,
        [
            documento,
            apellido,
            nombres,
            email,
            contrasenia,
            foto_path,
            rol,
            id
        ]
    );

    return result.affectedRows;
};

// Borrado lógico, no elimina el registro de la base
// Borrado lógico
export const remove = async (id) => {

    const [result] = await pool.query(
        `UPDATE usuarios
         SET activo = 0
         WHERE id_usuario = ?`,
        [id]
    );

    return result.affectedRows;
};

// Busca un usuario por documento y email
export const getByDocumentoYEmail = async (documento, email) => {

    const [rows] = await pool.query(
        `SELECT *
         FROM usuarios
         WHERE documento = ?
           AND email = ?
           AND activo = 1`,
        [
            documento,
            email
        ]
    );

    // Devuelve solamente el primer resultado
    return rows[0];
};