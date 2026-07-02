import pool from '../config/db.js';

// Trae todas las especialidades activas
export const getAll = async () => {

    const [rows] = await pool.query(
        `SELECT *
         FROM especialidades
         WHERE activo = 1`
    );

    return rows;
};

// Busca una especialidad por ID
export const getById = async (id) => {

    const [rows] = await pool.query(
        `SELECT *
         FROM especialidades
         WHERE id_especialidad = ?
         AND activo = 1`,
        [id]
    );

    return rows[0];
};

// Busca una especialidad por nombre
export const getByNombre = async (nombre) => {

    const [rows] = await pool.query(
        `SELECT *
         FROM especialidades
         WHERE nombre = ?
         AND activo = 1`,
        [nombre]
    );

    return rows[0];
};

// Crea una nueva especialidad
export const create = async (nombre) => {

    const [result] = await pool.query(
        `INSERT INTO especialidades (nombre)
         VALUES (?)`,
        [nombre]
    );

    return result;
};

// Actualiza una especialidad activa
export const update = async (id, nombre) => {

    const [result] = await pool.query(
        `UPDATE especialidades
         SET nombre = ?
         WHERE id_especialidad = ?
         AND activo = 1`,
        [nombre, id]
    );

    return result;
};

// Borrado lógico
export const remove = async (id) => {

    const [result] = await pool.query(
        `UPDATE especialidades
         SET activo = 0
         WHERE id_especialidad = ?
         AND activo = 1`,
        [id]
    );

    return result;
};