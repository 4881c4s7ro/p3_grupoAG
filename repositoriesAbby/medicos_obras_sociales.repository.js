import pool from '../config/db.js';


// Trae todas las relaciones medico - obra social activas
export const getAll = async () => {

    const [rows] = await pool.query(
        'SELECT * FROM medicos_obras_sociales WHERE activo = 1'
    );

    return rows;
};


// Busca una relación por id
export const getById = async (id) => {

    const [rows] = await pool.query(
        `SELECT * 
         FROM medicos_obras_sociales 
         WHERE id_medico_obra_social = ? 
         AND activo = 1`,
        [id]
    );

    // Devuelve solamente el primer resultado
    return rows[0];
};

// Busca la asociación entre un médico y una obra social
export const getByMedicoYObraSocial = async (
    id_medico,
    id_obra_social
) => {

    const [rows] = await pool.query(
        `SELECT *
         FROM medicos_obras_sociales
         WHERE id_medico = ?
           AND id_obra_social = ?
           AND activo = 1`,
        [
            id_medico,
            id_obra_social
        ]
    );

    return rows[0];

};

// Verifica si un médico atiende una determinada obra social
export const existeRelacion = async (id_medico, id_obra_social) => {

    const [rows] = await pool.query(
        `SELECT *
         FROM medicos_obras_sociales
         WHERE id_medico = ?
           AND id_obra_social = ?
           AND activo = 1`,
        [
            id_medico,
            id_obra_social
        ]
    );

    return rows.length > 0;
};

// Inserta una nueva relación medico - obra social
export const create = async (
    id_medico,
    id_obra_social
) => {

    const [result] = await pool.query(
        `INSERT INTO medicos_obras_sociales
        (
            id_medico,
            id_obra_social
        )
        VALUES (?, ?)`,
        [
            id_medico,
            id_obra_social
        ]
    );

    return result.insertId;
};

// Actualiza una relación medico - obra social
export const update = async (
    id,
    id_medico,
    id_obra_social
) => {

    const [result] = await pool.query(
        `UPDATE medicos_obras_sociales
         SET id_medico = ?,
             id_obra_social = ?
         WHERE id_medico_obra_social = ?`,
        [
            id_medico,
            id_obra_social,
            id
        ]
    );

    return result.affectedRows;
};

// Borrado logico, no elimina el registro de la base
export const remove = async (id) => {

    const [result] = await pool.query(
        `UPDATE medicos_obras_sociales
         SET activo = 0
         WHERE id_medico_obra_social = ?`,
        [id]
    );

    return result.affectedRows;
};