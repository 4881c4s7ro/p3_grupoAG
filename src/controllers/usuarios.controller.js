import * as usuariosService from '../services/usuarios.service.js';

// Obtener todos
export const getAll = async (req, res) => {

    try {

        const usuarios = await usuariosService.getAll();

        res.status(200).json(usuarios);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Obtener por ID
export const getById = async (req, res) => {

    try {

        const usuario = await usuariosService.getById(
            req.params.id
        );

        res.status(200).json(usuario);

    } catch (error) {

        res.status(404).json({
            message: error.message
        });

    }

};


// Crear
export const create = async (req, res) => {

    try {

        const usuario = await usuariosService.create(
            req.body
        );

        res.status(201).json({

            message: 'Usuario creado correctamente.',

            usuario

        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// Actualizar
export const update = async (req, res) => {

    try {

        const usuario = await usuariosService.update(

            req.params.id,

            req.body

        );

        res.status(200).json({

            message: 'Usuario actualizado correctamente.',

            usuario

        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// Eliminar
export const remove = async (req, res) => {

    try {

        await usuariosService.remove(
            req.params.id
        );

        res.status(200).json({

            message: 'Usuario eliminado correctamente.'

        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};