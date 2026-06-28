import pool from '../config/db.js';

// Trae todas las especialidades que esten activas
export const getAll = async () => {

    const [rows] = await pool.query(
        'SELECT * FROM especialidades WHERE activo = 1'
    );

    return rows;
};

// Busca una especialidad por id
export const getById = async (id) => {

    const [rows] = await pool.query(
        'SELECT * FROM especialidades WHERE id_especialidad = ? AND activo = 1',
        [id]
    );

    // Devuelve solamente el primer resultado
    return rows[0];
};

// Busca una especialidad por nombre (sin distinguir mayúsculas/minúsculas)
export const getByNombre = async (nombre) => {

    const [rows] = await pool.query(
        `SELECT *
         FROM especialidades
         WHERE UPPER(nombre) = UPPER(?)
           AND activo = 1`,
        [nombre]
    );

    return rows[0];
};


// Inserta una especialidad nueva
export const create = async (nombre) => {

    const [result] = await pool.query(
        `INSERT INTO especialidades(nombre)
         VALUES(?)`,
        [nombre]
    );

    return result.insertId;
};

// Actualiza el nombre de una especialidad
export const update = async (id, nombre) => {

    const [result] = await pool.query(
        `UPDATE especialidades
         SET nombre = ?
         WHERE id_especialidad = ?`,
        [nombre, id]
    );

    return result.affectedRows;
};

// Borrado logico, no elimina el registro de la base
export const remove = async (id) => {

    const [result] = await pool.query(
        `UPDATE especialidades
         SET activo = 0
         WHERE id_especialidad = ?`,
        [id]
    );

    return result.affectedRows;
};
