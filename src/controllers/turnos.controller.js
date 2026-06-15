import PDFDocument from 'pdfkit';
import * as turnosService from '../services/turnos.service.js';

// Registra un nuevo turno
export const registrarTurno = async (req, res) => {
    try {
        const resultado = await turnosService.crearReservaConTransaccion(req.body);

        return res.status(201).json({
            ok: true,
            message: 'Turno registrado.',
            data: resultado
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: error.message
        });
    }
};

// Marca un turno como atendido
export const atenderTurno = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_medico } = req.body;

        const resultado = await turnosService.atenderTurno(id, id_medico);

        return res.status(200).json({
            ok: true,
            message: 'Turno procesado y liquidación registrada con éxito.',
            data: resultado
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: error.message
        });
    }
};

// Obtiene el resumen mensual de facturación
export const obtenerReporteMensual = async (req, res) => {
    try {
        const reporte = await turnosService.obtenerReporteMensual();

        return res.status(200).json({
            ok: true,
            message: 'Reporte de facturación mensual generado con éxito.',
            data: reporte
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

// Genera un PDF con el listado de turnos
export const descargarReportePDF = async (req, res) => {
    try {
        const turnos = await turnosService.obtenerTurnosDetallados();
        const doc = new PDFDocument({ margin: 50 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=reporte-turnos.pdf');

        doc.pipe(res);

        // Título principal
        doc.fillColor('#1A365D')
            .fontSize(22)
            .text('CLÍNICA MÉDICA - GRUPO AG', { align: 'center' });

        doc.fontSize(12)
            .text('Reporte General de Turnos', { align: 'center' });

        doc.moveDown(2);

        // Encabezado de la tabla
        doc.fontSize(10)
            .fillColor('black')
            .text('ID | Fecha | Paciente | Médico | Obra Social | Monto', {
                underline: true
            });

        doc.moveDown(0.5);

        // Recorre los turnos y los agrega al PDF
        turnos.forEach((t) => {
            const fecha = new Date(t.fecha_hora).toLocaleDateString();

            doc.fontSize(9).text(
                `${t.id_turno_reserva} | ${fecha} | ${t.paciente_apellido} | ${t.medico_apellido} | ${t.obra_social_nombre} | $${t.valor_total}`
            );
        });

        doc.end();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error al generar el PDF',
            error: error.message
        });
    }
};