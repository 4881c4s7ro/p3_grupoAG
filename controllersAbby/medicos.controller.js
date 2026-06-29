import * as medicosService from '../services/medicos.service.js';


//---------------------------------------------------------
// Médico - Listar turnos propios
//---------------------------------------------------------
export const listarTurnosPropios = async (req, res) => {

    try {

        const resultado =
            await medicosService.listarTurnosPropios(
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
            await medicosService.marcarTurnoAtendido(
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
// Paciente - Listar médicos de una especialidad
//---------------------------------------------------------
export const listarMedicosPorEspecialidad = async (req, res) => {

    try {

        const resultado =
            await medicosService.listarMedicosPorEspecialidad(
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
// Administrador - Asociar médico con especialidad
//---------------------------------------------------------
export const asociarMedicoEspecialidad = async (req, res) => {

    try {

        const resultado =
            await medicosService.asociarMedicoEspecialidad(
                req.body
            );

        res.status(200).json(resultado);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

};