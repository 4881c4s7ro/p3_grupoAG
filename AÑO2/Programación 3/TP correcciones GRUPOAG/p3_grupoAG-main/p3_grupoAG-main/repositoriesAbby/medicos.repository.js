import pool from '../config/db.js';

// Trae todos los médicos
export const getAll = async () => {

    const [rows] = await pool.query(`
        SELECT *
        FROM medicos
    `);

    return rows;
};

// Busca un médico por id
export const getById = async (id) => {

    const [rows] = await pool.query(
        `SELECT *
         FROM medicos
         WHERE id_medico = ?`,
        [id]
    );

    return rows[0];
};

// Inserta un médico
export const create = async (medico) => {

    const {
        id_usuario,
        id_especialidad,
        matricula,
        descripcion,
        valor_consulta
    } = medico;

    const [result] = await pool.query(
        `INSERT INTO medicos
        (id_usuario, id_especialidad, matricula, descripcion, valor_consulta)
        VALUES (?, ?, ?, ?, ?)`,
        [
            id_usuario,
            id_especialidad,
            matricula,
            descripcion,
            valor_consulta
        ]
    );

    return result;
};

// Actualiza un médico
export const update = async (id, medico) => {

    const {
        id_usuario,
        id_especialidad,
        matricula,
        descripcion,
        valor_consulta
    } = medico;

    const [result] = await pool.query(
        `UPDATE medicos
        SET id_usuario = ?,
            id_especialidad = ?,
            matricula = ?,
            descripcion = ?,
            valor_consulta = ?
        WHERE id_medico = ?`,
        [
            id_usuario,
            id_especialidad,
            matricula,
            descripcion,
            valor_consulta,
            id
        ]
    );

    return result;
};

// Elimina un médico
export const remove = async (id) => {

    const [result] = await pool.query(
        'DELETE FROM medicos WHERE id_medico = ?',
        [id]
    );

    return result;
};