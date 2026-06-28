import * as turnosRepository from '../repositories/turnos.repository.js';

export const registrarTurno = async (datos) => {
    const { id_medico, id_paciente, id_obra_social, fecha_hora } = datos;

    // 1. Buscamos el médico para obtener el costo de su consulta
    const medico = await turnosRepository.getMedicoById(id_medico);
    if (!medico) {
        throw new Error('El médico especificado no existe.');
    }

    // 2. Buscamos la obra social para saber su condición comercial
    const obraSocial = await turnosRepository.getObraSocialById(id_obra_social);
    if (!obraSocial) {
        throw new Error('La obra social especificada no existe.');
    }
    if (obraSocial.activo !== 1) {
        throw new Error('La obra social seleccionada no se encuentra activa.');
    }

    // 3. Aplicamos la Regla de Negocio matemática para calcular el 'valor_total'
    let valor_total = 0;
    const costoBase = parseFloat(medico.valor_consulta);

    if (obraSocial.es_particular === 1) {
        // Si es particular, paga el valor completo de la consulta
        valor_total = costoBase;
    } else {
        // Si no es particular, calculamos el descuento decreciente
        // Ejemplo: Si el descuento es 20%, el paciente paga el 80% (costoBase - (20/100 * costoBase))
        const porcentaje = parseFloat(obraSocial.porcentaje_descuento) / 100;
        valor_total = costoBase - (porcentaje * costoBase);
    }

    // 4. Mandamos los datos listos al repositorio para que los guarde usando la transacción SQL
    const nuevoTurno = await turnosRepository.crearReservaConTransaccion({
        id_medico,
        id_paciente,
        id_obra_social,
        fecha_hora,
        valor_total
    });

    return nuevoTurno;
};


export const atenderTurno = async (id_turno) => {
    // 1. Validamos que el turno exista
    const turno = await turnosRepository.getTurnoById(id_turno);
    if (!turno) {
        throw new Error('El turno especificado no existe.');
    }
    if (turno.atentido === 1) {
        throw new Error('Este turno ya fue atendido previamente.');
    }

    // 2. Calculamos los honorarios de la liquidación
    const total = parseFloat(turno.valor_total);
    const porcentajeMedico = 0.80; // El médico se lleva el 80%
    const porcentajeClinica = 0.20; // La clínica se queda con el 20%

    const valor_medico = total * porcentajeMedico;
    const valor_clinica = total * porcentajeClinica;

    // 3. Impactamos los cambios usando la transacción en el repositorio
    const resultado = await turnosRepository.atenderTurnoConTransaccion(
        id_turno,
        turno.id_medico,
        total,
        valor_medico,
        valor_clinica
    );

    return resultado;
};

export const obtenerReporteMensual = async () => {
    return await turnosRepository.getReporteFacturacion();
};

export const obtenerTurnosDetallados = async () => {
    return await turnosRepository.getTurnosDetalladosParaPDF();
};