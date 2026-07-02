import pool from '../config/db.js';

// Obtener todos los usuarios activos
export const getAll = async () => {

    const [rows] = await pool.query(
        `SELECT *
         FROM usuarios
         WHERE activo = 1
         ORDER BY apellido, nombres`
    );

    return rows;
};


// Obtener usuario por ID
export const getById = async (id_usuario) => {

    const [rows] = await pool.query(
        `SELECT *
         FROM usuarios
         WHERE id_usuario = ?
         AND activo = 1`,
        [id_usuario]
    );

    return rows[0];
};


// Crear usuario
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


// Actualizar usuario
export const update = async (id_usuario, usuario) => {

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
         SET
            documento = ?,
            apellido = ?,
            nombres = ?,
            email = ?,
            contrasenia = ?,
            foto_path = ?,
            rol = ?
         WHERE id_usuario = ?
         AND activo = 1`,
        [
            documento,
            apellido,
            nombres,
            email,
            contrasenia,
            foto_path,
            rol,
            id_usuario
        ]
    );

    return result.affectedRows;
};


// Eliminación lógica
export const remove = async (id_usuario) => {

    const [result] = await pool.query(
        `UPDATE usuarios
         SET activo = 0
         WHERE id_usuario = ?
         AND activo = 1`,
        [id_usuario]
    );

    return result.affectedRows;
};