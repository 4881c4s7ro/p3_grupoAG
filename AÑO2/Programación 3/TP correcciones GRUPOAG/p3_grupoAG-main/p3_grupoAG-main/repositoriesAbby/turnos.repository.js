import pool from '../config/db.js';

// 1. Obtener la información del médico (para saber el valor de su consulta)
export const getMedicoById = async (id_medico) => {
    const [rows] = await pool.query(
        'SELECT id_medico, valor_consulta FROM medicos WHERE id_medico = ?',
        [id_medico]
    );
    return rows[0];
};

// 2. Obtener la información de la obra social (para saber si es particular y su descuento)
export const getObraSocialById = async (id_obra_social) => {
    const [rows] = await pool.query(
        'SELECT id_obra_social, porcentaje_descuento, es_particular, activo FROM Obras_sociales WHERE id_obra_social = ?',
        [id_obra_social]
    );
    return rows[0];
};

// 3. Crear la reserva utilizando una Transacción SQL para asegurar el guardado
export const crearReservaConTransaccion = async (datosTurno) => {
    const { id_medico, id_paciente, id_obra_social, fecha_hora, valor_total } = datosTurno;
    
    const connection = await pool.getConnection();
    
    try {
        await connection.query('START TRANSACTION');

        const queryInsert = `
            INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atentido, activo)
            VALUES (?, ?, ?, ?, ?, 0, 1)
        `;
        
        const [result] = await connection.query(queryInsert, [
            id_medico,
            id_paciente,
            id_obra_social,
            fecha_hora,
            valor_total
        ]);

        await connection.query('COMMIT');
        
        return {
            id_turno_reserva: result.insertId,
            ...datosTurno,
            atentido: 0,
            activo: 1
        };

    } catch (error) {
        await connection.query('ROLLBACK');
        throw error;
    } finally {
        connection.release();
    }
};

// 4. Buscar un turno por ID (para verificar si existe y obtener su valor)
export const getTurnoById = async (id) => {
    const [rows] = await pool.query(
        'SELECT id_turno_reserva, id_medico, valor_total, atentido, activo FROM turnos_reservas WHERE id_turno_reserva = ?',
        [id]
    );
    return rows[0];
};

// 5. Registrar la atención del turno y crear la liquidación (Con Transacción SQL - LIMPIO)
export const atenderTurnoConTransaccion = async (id_turno, id_medico, valor_total, valor_medico, valor_clinica) => {
    const connection = await pool.getConnection();
    try {
        await connection.query('START TRANSACTION');

        // A. Actualizamos el campo 'atentido' a 1
        await connection.query(
            'UPDATE turnos_reservas SET atentido = 1 WHERE id_turno_reserva = ?',
            [id_turno]
        );

        // B. Insertamos el registro en la tabla de liquidaciones
        const queryLiquidacion = `
            INSERT INTO liquidaciones_medico (id_medico, id_turno_reserva, fecha, valor_total, valor_medico, valor_clinica, activo)
            VALUES (?, ?, NOW(), ?, ?, ?, 1)
        `;
        await connection.query(queryLiquidacion, [
            id_medico,
            id_turno,
            valor_total,
            valor_medico,
            valor_clinica
        ]);

        await connection.query('COMMIT');
        return { id_turno, atendido: 1, valor_medico, valor_clinica };

    } catch (error) {
        await connection.query('ROLLBACK');
        throw error;
    } finally {
        connection.release();
    }
};

// 6. Obtener reporte mensual de facturación mediante Procedimiento Almacenado
export const getReporteFacturacion = async () => {
    // Al usar CALL, MySQL devuelve una estructura compleja, los datos reales están en la primera posición [0]
    const [result] = await pool.query('CALL ObtenerReporteFacturacion()');
    return result[0];
};


// 7. Obtener todos los turnos detallados para el reporte PDF
export const getTurnosDetalladosParaPDF = async () => {
    const query = `
        SELECT 
            tr.id_turno_reserva,
            tr.fecha_hora,
            tr.valor_total,
            tr.atentido,
            u_p.apellido AS paciente_apellido,
            u_p.nombres AS paciente_nombre,
            os.nombre AS obra_social_nombre,
            u_m.apellido AS medico_apellido,
            u_m.nombres AS medico_nombre
        FROM turnos_reservas tr
        INNER JOIN pacientes p ON tr.id_paciente = p.id_paciente
        INNER JOIN usuarios u_p ON p.id_usuario = u_p.id_usuario
        INNER JOIN medicos m ON tr.id_medico = m.id_medico
        INNER JOIN usuarios u_m ON m.id_usuario = u_m.id_usuario
        INNER JOIN obras_sociales os ON tr.id_obra_social = os.id_obra_social
        WHERE tr.activo = 1
        ORDER BY tr.fecha_hora DESC
    `;
    const [rows] = await pool.query(query);
    return rows;
};