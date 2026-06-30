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

// Busca un médico por id_usuario
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

// Obtener  por documento y email
export const ObtenerDatosMedico = async (documento,email) => {

    const [rows] = await pool.query(
        `
        SELECT
            m.id_medico,
            m.id_usuario,
            e.id_especialidad
            e.nombre
            e.nombre,
            u.documento,
            u.apellido,
            u.nombres,
            u.email,
            u.rol,
            u.activo
    
        FROM medicos m
        INNER JOIN usuarios u
            ON m.id_usuario = u.id_usuario

        INNER JOIN especialidades e
            ON m.id_especialidad = e.id_especialidad

        WHERE u.documento = ?
          AND u.email = ?
          AND u.activo = 1
        `,
        [
            documento,
            email
        ]
    );

    return rows[0];
};

// Obtener  por documento y email
export const ObtenerMedicoEspecialidad = async (nombreEspecialidad) => {

    const [rows] = await pool.query(
        `
        SELECT
    m.id_medico,

    u.id_usuario,
    u.documento,
    u.apellido,
    u.nombres,
    u.email,
    u.rol,
    u.activo AS usuario_activo,

    e.id_especialidad,
    e.nombre AS especialidad,

    m.matricula,
    m.descripcion,
    m.valor_consulta,

    os.id_obra_social,
    os.nombre AS obra_social,
    os.descripcion AS descripcion_obra_social,
    os.porcentaje_descuento,
    os.es_particular,
    os.activo AS obra_social_activa

FROM medicos m

INNER JOIN usuarios u
    ON m.id_usuario = u.id_usuario

INNER JOIN especialidades e
    ON m.id_especialidad = e.id_especialidad

INNER JOIN medicos_obras_sociales mos
    ON m.id_medico = mos.id_medico
   AND mos.activo = 1

INNER JOIN obras_sociales os
    ON mos.id_obra_social = os.id_obra_social

WHERE u.activo = 1
  AND e.activo = 1
  AND os.activo = 1
  AND e.nombre=?

ORDER BY
    u.apellido,
    u.nombres,
    os.nombre;
        `,
        [
            nombreEspecialidad
        ]
    );

    return rows[0];
};

