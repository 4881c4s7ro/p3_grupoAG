import pool from '../config/db.js';

// Trae todos los pacientes
export const getAll = async () => {

    const [rows] = await pool.query(
        `SELECT *
         FROM pacientes`
    );

    return rows;
};

// Busca un paciente por ID
export const getById = async (id) => {

    const [rows] = await pool.query(
        `SELECT *
         FROM pacientes
         WHERE id_paciente = ?`,
        [id]
    );

    return rows[0];
};

// Busca un paciente por usuario
export const getByUsuario = async (id_usuario) => {

    const [rows] = await pool.query(
        `SELECT *
         FROM pacientes
         WHERE id_usuario = ?`,
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
            (id_usuario, id_obra_social)
         VALUES (?, ?)`,
        [
            id_usuario,
            id_obra_social
        ]
    );

    return result;
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

    return result;
};

// Elimina un paciente
export const remove = async (id) => {

    const [result] = await pool.query(
        `DELETE FROM pacientes
         WHERE id_paciente = ?`,
        [id]
    );

    return result;
};

// Obtener pacientes por obra social
export const getByObraSocial = async (idObraSocial) => {

    const [rows] = await pool.query(
        `SELECT *
         FROM pacientes
         WHERE id_obra_social = ?`,
        [idObraSocial]
    );

    return rows;

};