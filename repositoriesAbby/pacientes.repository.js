import pool from '../config/db.js';


// Trae todos los pacientes activos
export const getAll = async () => {

    const [rows] = await pool.query(
        `SELECT p.*
         FROM pacientes p
         INNER JOIN usuarios u
            ON p.id_usuario = u.id_usuario
         WHERE u.activo = 1
         ORDER BY p.id_paciente`
    );

    return rows;
};


// Busca un paciente por id
export const getById = async (id) => {

    const [rows] = await pool.query(
        `SELECT p.*
         FROM pacientes p
         INNER JOIN usuarios u
            ON p.id_usuario = u.id_usuario
         WHERE p.id_paciente = ?
           AND u.activo = 1`,
        [id]
    );

    return rows[0];
};


// Busca un paciente por id_usuario
export const getByUsuario = async (id_usuario) => {

    const [rows] = await pool.query(
        `SELECT p.*
         FROM pacientes p
         INNER JOIN usuarios u
            ON p.id_usuario = u.id_usuario
         WHERE p.id_usuario = ?
           AND u.activo = 1`,
        [id_usuario]
    );

    return rows[0];
};


// Inserta un paciente
export const create = async (paciente) => {

    const {
        id_usuario,
        id_obra_social
    } = paciente;

    const [result] = await pool.query(
        `INSERT INTO pacientes
        (
            id_usuario,
            id_obra_social
        )
        VALUES (?, ?)`,
        [
            id_usuario,
            id_obra_social
        ]
    );

    return result.insertId;
};


// Actualiza un paciente
export const update = async (id, paciente) => {

    const {
        id_usuario,
        id_obra_social
    } = paciente;

    const [result] = await pool.query(
        `UPDATE pacientes
         SET id_usuario = ?,
             id_obra_social = ?
         WHERE id_paciente = ?`,
        [
            id_usuario,
            id_obra_social,
            id
        ]
    );

    return result.affectedRows;
};


// Borrado lógico del paciente (desactiva el usuario asociado)
export const remove = async (id) => {

    const [result] = await pool.query(
        `UPDATE usuarios u
         INNER JOIN pacientes p
            ON u.id_usuario = p.id_usuario
         SET u.activo = 0
         WHERE p.id_paciente = ?`,
        [id]
    );

    return result.affectedRows;
};

// Actualiza la obra social del paciente
export const asociarObraSocial = async (
    id_paciente,
    id_obra_social
) => {

    const [result] = await pool.query(
        `UPDATE pacientes
         SET id_obra_social = ?
         WHERE id_paciente = ?`,
        [
            id_obra_social,
            id_paciente
        ]
    );

    return result.affectedRows;

};