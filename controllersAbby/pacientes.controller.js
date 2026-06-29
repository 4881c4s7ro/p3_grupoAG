import * as pacientesService from '../services/pacientes.service.js';


//---------------------------------------------------------
// Paciente - Reservar un turno
//---------------------------------------------------------
export const reservarTurno = async (req, res) => {

    try {

        const resultado =
            await pacientesService.reservarTurno(
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

    try {

        const resultado =
            await pacientesService.listarTurnosPaciente(
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
// Administrador - Asociar o cambiar la obra social
// habitual de un paciente
//---------------------------------------------------------
export const asociarObraSocial = async (req, res) => {

    try {

        const resultado =
            await pacientesService.asociarObraSocial(
                req.body
            );

        res.status(200).json(resultado);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

};