import pool from "../config/db.js";

// Obtener todos los turnos activos
export const getAll = async () => {

    const [rows] = await pool.query(`
        SELECT
            tr.id_turno_reserva,
            tr.fecha_hora,
            tr.valor_total,
            tr.atentido,

            um.apellido AS apellido_medico,
            um.nombres AS nombre_medico,

            up.apellido AS apellido_paciente,
            up.nombres AS nombre_paciente,

            os.nombre AS obra_social

        FROM turnos_reservas tr

        INNER JOIN medicos m
            ON tr.id_medico = m.id_medico

        INNER JOIN usuarios um
            ON m.id_usuario = um.id_usuario

        INNER JOIN pacientes p
            ON tr.id_paciente = p.id_paciente

        INNER JOIN usuarios up
            ON p.id_usuario = up.id_usuario

        INNER JOIN obras_sociales os
            ON tr.id_obra_social = os.id_obra_social

        WHERE tr.activo = 1
          AND um.activo = 1
          AND up.activo = 1
          AND os.activo = 1

        ORDER BY tr.fecha_hora ASC
    `);

    return rows;
};


// Obtener turno por ID
export const getById = async (id_turno_reserva) => {

    const [rows] = await pool.query(`
        SELECT
            tr.*,

            um.apellido AS apellido_medico,
            um.nombres AS nombre_medico,

            up.apellido AS apellido_paciente,
            up.nombres AS nombre_paciente,

            os.nombre AS obra_social

        FROM turnos_reservas tr

        INNER JOIN medicos m
            ON tr.id_medico = m.id_medico

        INNER JOIN usuarios um
            ON m.id_usuario = um.id_usuario

        INNER JOIN pacientes p
            ON tr.id_paciente = p.id_paciente

        INNER JOIN usuarios up
            ON p.id_usuario = up.id_usuario

        INNER JOIN obras_sociales os
            ON tr.id_obra_social = os.id_obra_social

        WHERE tr.id_turno_reserva = ?
          AND tr.activo = 1
          AND um.activo = 1
          AND up.activo = 1
          AND os.activo = 1
    `, [id_turno_reserva]);

    return rows[0];
};


// Crear turno
export const create = async (turnoReserva) => {

    const {
        id_medico,
        id_paciente,
        id_obra_social,
        fecha_hora,
        valor_total,
        atentido
    } = turnoReserva;

    const [result] = await pool.query(`
        INSERT INTO turnos_reservas
        (
            id_medico,
            id_paciente,
            id_obra_social,
            fecha_hora,
            valor_total,
            atentido
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `, [
        id_medico,
        id_paciente,
        id_obra_social,
        fecha_hora,
        valor_total,
        atentido
    ]);

    return result.insertId;
};


// Actualizar turno
export const update = async (id_turno_reserva, turnoReserva) => {

    const {
        id_medico,
        id_paciente,
        id_obra_social,
        fecha_hora,
        valor_total,
        atentido
    } = turnoReserva;

    const [result] = await pool.query(`
        UPDATE turnos_reservas
        SET
            id_medico = ?,
            id_paciente = ?,
            id_obra_social = ?,
            fecha_hora = ?,
            valor_total = ?,
            atentido = ?
        WHERE id_turno_reserva = ?
          AND activo = 1
    `, [
        id_medico,
        id_paciente,
        id_obra_social,
        fecha_hora,
        valor_total,
        atentido,
        id_turno_reserva
    ]);

    return result.affectedRows;
};


// Eliminación lógica
export const remove = async (id_turno_reserva) => {

    const [result] = await pool.query(`
        UPDATE turnos_reservas
        SET activo = 0
        WHERE id_turno_reserva = ?
          AND activo = 1
    `, [id_turno_reserva]);

    return result.affectedRows;
};


// Obtener turnos pendientes de un médico por documento
export const getTurnosPendientesPorDocumentoMedico = async (documento) => {

    const [rows] = await pool.query(`
        SELECT
            e.nombre AS especialidad,
            tr.fecha_hora,
            up.apellido AS apellido_paciente,
            up.nombres AS nombre_paciente,

            CASE
                WHEN os.es_particular = 1 THEN 'PARTICULAR'
                ELSE os.nombre
            END AS cobertura,

            tr.valor_total

        FROM usuarios um

        INNER JOIN medicos m
            ON um.id_usuario = m.id_usuario

        INNER JOIN especialidades e
            ON m.id_especialidad = e.id_especialidad

        INNER JOIN turnos_reservas tr
            ON m.id_medico = tr.id_medico

        INNER JOIN pacientes p
            ON tr.id_paciente = p.id_paciente

        INNER JOIN usuarios up
            ON p.id_usuario = up.id_usuario

        INNER JOIN obras_sociales os
            ON tr.id_obra_social = os.id_obra_social

        WHERE um.documento = ?
          AND tr.atentido = 0
          AND tr.activo = 1
          AND um.activo = 1
          AND up.activo = 1
          AND os.activo = 1

        ORDER BY tr.fecha_hora ASC
    `, [documento]);

    return rows;
};