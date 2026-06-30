import * as turnosReservasService from '../services/turnos_reservas.service.js';


//---------------------------------------------------------
// Paciente - Reservar un turno propio
//---------------------------------------------------------
export const reservarPacienteTurno = async (req, res) => {

    try {

        const resultado =
            await turnosReservasService.reservarPacienteTurno(
                req.body
            );

        res.status(201).json(resultado);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

};


//---------------------------------------------------------
// Paciente - Listar turnos propios
//---------------------------------------------------------
export const listarTurnosPaciente = async (req, res) => {

    try {console.log("antes de mandar al sercicio",req.body);

        const resultado =
            await turnosReservasService.listarTurnosPaciente(
                req.body
            );

        res.status(200).json(resultado);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

};


//---------------------------------------------------------
// Médico - Listar turnos propios
//---------------------------------------------------------
export const listarTurnosMedico = async (req, res) => {

    try {

        const resultado =
            await turnosReservasService.listarTurnosMedico(
                req.body
            );

        res.status(200).json(resultado);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

};


//---------------------------------------------------------
// Médico - Marcar un turno como atendido
//---------------------------------------------------------
export const marcarTurnoAtendido = async (req, res) => {

    try {

        const resultado =
            await turnosReservasService.marcarTurnoAtendido(
                req.body
            );

        res.status(200).json(resultado);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

};


//---------------------------------------------------------
// Administrador - Registrar un turno para un paciente
//---------------------------------------------------------
export const registrarTurnoPaciente = async (req, res) => {

    try {

        const resultado =
            await turnosReservasService.registrarTurnoPaciente(
                req.body
            );

        res.status(201).json(resultado);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

};


//---------------------------------------------------------
// Administrador - Obtener estadísticas
//---------------------------------------------------------
export const obtenerEstadisticas = async (req, res) => {

    try {

        const resultado =
            await turnosReservasService.obtenerEstadisticas(); // no existe aun

        res.status(200).json(resultado);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

};


//---------------------------------------------------------
// Administrador - Generar informe PDF
//---------------------------------------------------------
export const generarInformePDF = async (req, res) => {

    try {

        const resultado =
            await turnosReservasService.generarInformePDF(); // no existe aun

        res.status(200).json(resultado);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

};