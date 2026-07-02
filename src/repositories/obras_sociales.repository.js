import pool from '../config/db.js';

// Trae todas las obras sociales activas
export const obtener_ObrasSociales = async () => {

    const [rows] = await pool.query(
        `SELECT *
         FROM obras_sociales
         WHERE activo = 1`
    );

    return rows;
};

// Busca una obra social por ID
export const obtener_ObraSocial_id = async (id) => {

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
export const obtener_ObraSocial_nombre = async (nombre) => {

    const [rows] = await pool.query(
        `SELECT *
         FROM obras_sociales
         WHERE nombre = ?
         AND activo = 1`,
        [nombre]
    );

    return rows[0];
};

// Crea una nueva obra social
export const crear_ObraSocial = async (
    nombre,
    descripcion,
    porcentaje_descuento,
    es_particular
) => {

    const [result] = await pool.query(
        `INSERT INTO obras_sociales
            (nombre, descripcion, porcentaje_descuento, es_particular)
         VALUES (?, ?, ?, ?)`,
        [
            nombre,
            descripcion,
            porcentaje_descuento,
            es_particular
        ]
    );

    return result;
};

// Actualiza una obra social activa
export const actualizar_ObraSocial = async (
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
         WHERE id_obra_social = ?
         AND activo = 1`,
        [
            nombre,
            descripcion,
            porcentaje_descuento,
            es_particular,
            id
        ]
    );

    return result;
};

// Borrado lógico
export const remove = async (id) => {

    const [result] = await pool.query(
        `UPDATE obras_sociales
         SET activo = 0
         WHERE id_obra_social = ?
         AND activo = 1`,
        [id]
    );

    return result;
};