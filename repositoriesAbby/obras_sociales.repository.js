import pool from '../config/db.js';


// Trae todas las obras sociales activas
export const getAll = async () => {

    const [rows] = await pool.query(
        `SELECT *
         FROM obras_sociales
         WHERE activo = 1
         ORDER BY nombre`
    );

    return rows;
};


// Busca una obra social por id
export const getById = async (id) => {

    const [rows] = await pool.query(
        `SELECT *
         FROM obras_sociales
         WHERE id_obra_social = ?
           AND activo = 1`,
        [id]
    );

    return rows[0];
};

// Busca una obra social por nombre
export const getByNombre = async (nombre) => {

    const [rows] = await pool.query(
        `SELECT *
         FROM obras_sociales
         WHERE nombre = ?
           AND activo = 1`,
        [nombre]
    );

    return rows[0];

};


// Obtiene la obra social correspondiente a PARTICULAR
export const getParticular = async () => {

    const [rows] = await pool.query(
        `SELECT *
         FROM obras_sociales
         WHERE es_particular = 1
           AND activo = 1
         LIMIT 1`
    );

    return rows[0];
};


// Inserta una nueva obra social
export const create = async (
    nombre,
    descripcion,
    porcentaje_descuento,
    es_particular
) => {

    const [result] = await pool.query(
        `INSERT INTO obras_sociales
        (
            nombre,
            descripcion,
            porcentaje_descuento,
            es_particular
        )
        VALUES (?, ?, ?, ?)`,
        [
            nombre,
            descripcion,
            porcentaje_descuento,
            es_particular
        ]
    );

    return result.insertId;
};


// Actualiza una obra social
export const update = async (
    id,
    nombre,
    descripcion,
    porcentaje_descuento,
    es_particular
) => {

    const [result] = await pool.query(
        `UPDATE obras_sociales
         SET nombre = ?,
             descripcion = ?,
             porcentaje_descuento = ?,
             es_particular = ?
         WHERE id_obra_social = ?`,
        [
            nombre,
            descripcion,
            porcentaje_descuento,
            es_particular,
            id
        ]
    );

    return result.affectedRows;
};

// Borrado lógico
export const remove = async (id) => {

    const [result] = await pool.query(
        `UPDATE obras_sociales
         SET activo = 0
         WHERE id_obra_social = ?`,
        [id]
    );

    return result.affectedRows;
};