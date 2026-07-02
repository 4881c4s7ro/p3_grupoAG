import * as medicosService from '../services/medicos.service.js';

/*
=========================================
OBTENER TODOS
=========================================
*/
export const getAll = async (req, res) => {

    try {

        const medicos = await medicosService.getAll();

        res.status(200).json(medicos);

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

        const medico = await medicosService.getById(
            req.params.id
        );

        res.status(200).json(medico);

    } catch (error) {

        res.status(404).json({
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

        const medico = await medicosService.create(
            req.body
        );

        res.status(201).json({
            message: 'Médico creado correctamente.',
            medico
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

        const medico = await medicosService.update(
            req.params.id,
            req.body
        );

        res.status(200).json({
            message: 'Médico actualizado correctamente.',
            medico
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

/*
=========================================
ASOCIAR ESPECIALIDAD
=========================================
*/
export const asociarEspecialidad = async (req, res) => {

    try {

        const medico =
            await medicosService.asociarEspecialidad(
                req.params.id,
                req.body.id_especialidad
            );

        res.status(200).json({
            message: 'Especialidad asociada correctamente.',
            medico
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

/*
=========================================
LISTAR POR ESPECIALIDAD
=========================================
*/
export const getByEspecialidad = async (req, res) => {

    try {

        const medicos =
            await medicosService.getByEspecialidad(
                req.params.idEspecialidad
            );

        res.status(200).json(medicos);

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

        await medicosService.remove(
            req.params.id
        );

        res.status(200).json({
            message: 'Médico eliminado correctamente.'
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};