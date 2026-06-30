import pool from '../config/db.js';


// Obtener todos los turnos activos
export const getAll = async () => {

    const [rows] = await pool.query(
        `SELECT *
         FROM turnos_reservas
         WHERE activo = 1`
    );

    return rows;
};


// Obtener turno por ID
export const getById = async (id_turno_reserva) => {

    const [rows] = await pool.query(
        `SELECT *
         FROM turnos_reservas
         WHERE id_turno_reserva = ?
         AND activo = 1`,
        [id_turno_reserva]
    );

    return rows[0];
};
 
// obtiene los turnos de un paciente

export const listarTurnosPacientes = async (id_paciente) => {

    const [rows] = await pool.query(
        `SELECT
            tr.fecha_hora AS fecha_turno,
            up.nombres AS nombre_paciente,
            up.apellido AS apellido_paciente,
            e.nombre AS especialidad,
            um.nombres AS nombre_medico,
            um.apellido AS apellido_medico
        FROM turnos_reservas tr

        INNER JOIN pacientes p
            ON tr.id_paciente = p.id_paciente

        INNER JOIN usuarios up
            ON p.id_usuario = up.id_usuario

        INNER JOIN medicos m
            ON tr.id_medico = m.id_medico

        INNER JOIN usuarios um
            ON m.id_usuario = um.id_usuario

        INNER JOIN especialidades e
            ON m.id_especialidad = e.id_especialidad

        WHERE
            p.id_paciente=?
            AND tr.activo = 1
            AND up.activo = 1
            AND um.activo = 1
            
        ORDER BY tr.fecha_hora`,
        [id_paciente]
    );

    return rows;
};

export const listarTurnosMedico = async (id_medico) => {

    const [rows] = await pool.query(
        `SELECT
                    tr.fecha_hora AS fecha_turno,
                    um.nombres AS nombre_medico,
                    um.apellido AS apellido_medico,
                    up.nombres AS nombre_paciente,
                    up.apellido AS apellido_paciente,
                    e.nombre AS especialidad
                FROM turnos_reservas tr

                INNER JOIN medicos m
                    ON tr.id_medico = m.id_medico

                INNER JOIN usuarios um
                    ON m.id_usuario = um.id_usuario

                INNER JOIN pacientes p
                    ON tr.id_paciente = p.id_paciente

                INNER JOIN usuarios up
                    ON p.id_usuario = up.id_usuario

                INNER JOIN especialidades e
                    ON m.id_especialidad = e.id_especialidad

                WHERE
                    tr.id_medico = ?
                    AND tr.activo = 1
                    AND up.activo = 1
                    AND um.activo = 1

                ORDER BY tr.fecha_hora;`,
        [id_medico]
    );

    return rows;
};


// Verifica si un médico ya tiene un turno reservado
export const existeTurno = async (id_medico, fecha_hora) => {

    const [rows] = await pool.query(
        `SELECT 1
         FROM turnos_reservas
         WHERE id_medico = ?
           AND fecha_hora = ?
           AND activo = 1
         LIMIT 1`,
        [
            id_medico,
            fecha_hora
        ]
    );

    return rows.length > 0;
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


    const [result] = await pool.query(
        `INSERT INTO turnos_reservas
        (
            id_medico,
            id_paciente,
            id_obra_social,
            fecha_hora,
            valor_total,
            atentido
        )
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            id_medico,
            id_paciente,
            id_obra_social,
            fecha_hora,
            valor_total,
            atentido
        ]
    );


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


    const [result] = await pool.query(
        `UPDATE turnos_reservas
        SET
            id_medico = ?,
            id_paciente = ?,
            id_obra_social = ?,
            fecha_hora = ?,
            valor_total = ?,
            atentido = ?
        WHERE id_turno_reserva = ?`,
        [
            id_medico,
            id_paciente,
            id_obra_social,
            fecha_hora,
            valor_total,
            atentido,
            id_turno_reserva
        ]
    );


    return result.affectedRows;
};


// Eliminación lógica
export const remove = async (id_turno_reserva) => {

    const [result] = await pool.query(
        `UPDATE turnos_reservas
         SET activo = 0
         WHERE id_turno_reserva = ?`,
        [id_turno_reserva]
    );


    return result.affectedRows;
};


// Obtener los turnos pendientes de un médico por su documento

/* Dado un medico , ya sea por su dni, mostrar los turnos sin atender que debe atender, 
detallando especialidad, nombre y apellido del paciente,si es particular y sino, 
si tiene cobertura que muestre el nombre de la obra social,  fecha y hora del turno, 
como asi tambien el valor total de la consulta  */ 

export const getTurnosPendientesPorDocumentoMedico = async (documento) => {

    const [rows] = await pool.query(
        `SELECT
            e.nombre AS especialidad,
            tr.fecha_hora AS fecha_hora_turno,
            up.nombres AS nombre_paciente,
            up.apellido AS apellido_paciente,
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

        ORDER BY tr.fecha_hora ASC`,
        [documento]
    );

    return rows;
};



/* Dado el dni de un medico y el dni de su paciente y dado una fecha y hora especifica de atencion 
modificar el turno del paciente con ese medico a atendido. */

// Marcar como atendido un turno a partir del documento del médico,
// documento del paciente y la fecha/hora del turno
export const marcarTurnoComoAtendido = async (
    documentoMedico,
    documentoPaciente,
    fechaHora
) => {

    const [result] = await pool.query(
        `UPDATE turnos_reservas tr

        INNER JOIN medicos m
            ON tr.id_medico = m.id_medico

        INNER JOIN usuarios um
            ON m.id_usuario = um.id_usuario

        INNER JOIN pacientes p
            ON tr.id_paciente = p.id_paciente

        INNER JOIN usuarios up
            ON p.id_usuario = up.id_usuario

        SET tr.atentido = 1

        WHERE um.documento = ?
          AND up.documento = ?
          AND tr.fecha_hora = ?
          AND tr.atentido = 0
          AND tr.activo = 1`,
        [
            documentoMedico,
            documentoPaciente,
            fechaHora
        ]
    );

    return result.affectedRows;
};

