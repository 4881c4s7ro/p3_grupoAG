import pool from '../config/db.js';

// Trae todos los médicos activos
export const getAll = async () => {

    const [rows] = await pool.query(
        `SELECT m.*
         FROM medicos m
         INNER JOIN usuarios u
            ON m.id_usuario = u.id_usuario
         WHERE u.activo = 1
         ORDER BY m.id_medico`
    );

    return rows;
};


// Busca un médico por id
export const getById = async (id) => {

    const [rows] = await pool.query(
        `SELECT m.*
         FROM medicos m
         INNER JOIN usuarios u
            ON m.id_usuario = u.id_usuario
         WHERE m.id_medico = ?
           AND u.activo = 1`,
        [id]
    );

    return rows[0];
};


// Obtiene los médicos activos de una especialidad
export const getByEspecialidad = async (id_especialidad) => {

    const [rows] = await pool.query(
        `SELECT
            m.id_medico,
            u.apellido,
            u.nombres,
            m.matricula,
            m.descripcion,
            m.valor_consulta
         FROM medicos m
         INNER JOIN usuarios u
            ON m.id_usuario = u.id_usuario
         WHERE m.id_especialidad = ?
           AND u.activo = 1
         ORDER BY u.apellido, u.nombres`,
        [id_especialidad]
    );

    return rows;
};

/ Busca un médico por id_usuario
export const getByUsuario = async (id_usuario) => {

    const [rows] = await pool.query(
        `SELECT m.*
         FROM medicos m
         INNER JOIN usuarios u
            ON m.id_usuario = u.id_usuario
         WHERE m.id_usuario = ?
           AND u.activo = 1`,
        [id_usuario]
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
        (
            id_usuario,
            id_especialidad,
            matricula,
            descripcion,
            valor_consulta
        )
        VALUES (?, ?, ?, ?, ?)`,
        [
            id_usuario,
            id_especialidad,
            matricula,
            descripcion,
            valor_consulta
        ]
    );

    return result.insertId;
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

/