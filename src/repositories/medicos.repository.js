import pool from '../config/db.js';

// Obtener todos los médicos
export const getAll = async () => {

    const [rows] = await pool.query(`
        SELECT *
        FROM medicos
    `);

    return rows;

};

// Obtener médico por ID
export const getById = async (id) => {

    const [rows] = await pool.query(`
        SELECT *
        FROM medicos
        WHERE id_medico = ?
    `, [id]);

    return rows[0];

};

// Obtener médico por usuario
export const getByUsuario = async (idUsuario) => {

    const [rows] = await pool.query(`
        SELECT *
        FROM medicos
        WHERE id_usuario = ?
    `, [idUsuario]);

    return rows[0];

};

// Obtener médico por matrícula
export const getByMatricula = async (matricula) => {

    const [rows] = await pool.query(`
        SELECT *
        FROM medicos
        WHERE matricula = ?
    `, [matricula]);

    return rows[0];

};

// Obtener médicos por especialidad
export const getAllByEspeciality = async (idEspecialidad) => {

    const [rows] = await pool.query(`
        SELECT *
        FROM medicos
        WHERE id_especialidad = ?
    `, [idEspecialidad]);

    return rows;

};

// Crear médico
export const create = async (medico) => {

    const {
        id_usuario,
        id_especialidad,
        matricula,
        descripcion,
        valor_consulta
    } = medico;

    const [result] = await pool.query(`
        INSERT INTO medicos
        (
            id_usuario,
            id_especialidad,
            matricula,
            descripcion,
            valor_consulta
        )
        VALUES (?, ?, ?, ?, ?)
    `,
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

// Actualizar médico
export const update = async (id, medico) => {

    const {
        id_usuario,
        id_especialidad,
        matricula,
        descripcion,
        valor_consulta
    } = medico;

    const [result] = await pool.query(`
        UPDATE medicos
        SET
            id_usuario = ?,
            id_especialidad = ?,
            matricula = ?,
            descripcion = ?,
            valor_consulta = ?
        WHERE id_medico = ?
    `,
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

// Eliminar médico
export const remove = async (id) => {

    const [result] = await pool.query(`
        DELETE FROM medicos
        WHERE id_medico = ?
    `, [id]);

    return result;

};