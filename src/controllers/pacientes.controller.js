import * as pacientesService from '../services/pacientes.service.js';

/*
=========================================
OBTENER TODOS
=========================================
*/
export const getAll = async (req, res) => {

    try {

        const pacientes = await pacientesService.getAll();

        res.status(200).json(pacientes);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

/*
=========================================
OBTENER POR ID
=========================================
*/
export const getById = async (req, res) => {

    try {

        const paciente =
            await pacientesService.getById(
                req.params.id
            );

        // Si es paciente solamente puede ver sus propios datos
        if (
            req.usuario.rol === 2 &&
            paciente.id_usuario !== req.usuario.id_usuario
        ) {

            return res.status(403).json({
                message: 'No posee permisos para consultar este paciente.'
            });

        }

        res.status(200).json(paciente);

    } catch (error) {

        res.status(404).json({
            message: error.message
        });

    }

};

/*
=========================================
OBTENER POR USUARIO
=========================================
*/
export const getByUsuario = async (req, res) => {

    try {

        const paciente =
            await pacientesService.getByUsuario(
                req.params.idUsuario
            );

        res.status(200).json(paciente);

    } catch (error) {

        res.status(404).json({
            message: error.message
        });

    }

};

/*
=========================================
OBTENER POR OBRA SOCIAL
=========================================
*/
export const getByObraSocial = async (req, res) => {

    try {

        const pacientes =
            await pacientesService.getByObraSocial(
                req.params.idObraSocial
            );

        res.status(200).json(pacientes);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

/*
=========================================
CREAR
=========================================
*/
export const create = async (req, res) => {

    try {

        const paciente =
            await pacientesService.create(
                req.body
            );

        res.status(201).json({
            message: 'Paciente creado correctamente.',
            paciente
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

/*
=========================================
ACTUALIZAR
=========================================
*/
export const update = async (req, res) => {

    try {

        const paciente =
            await pacientesService.update(
                req.params.id,
                req.body
            );

        res.status(200).json({
            message: 'Paciente actualizado correctamente.',
            paciente
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

/*
=========================================
ELIMINAR
=========================================
*/
export const remove = async (req, res) => {

    try {

        await pacientesService.remove(
            req.params.id
        );

        res.status(200).json({
            message: 'Paciente eliminado correctamente.'
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};