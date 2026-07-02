import * as obrasSocialesService from '../services/obras_sociales.service.js';


// Obtener todas las obras sociales
export const obtenerObrasSociales = async (req, res) => {

    try {

        const obrasSociales =
            await obrasSocialesService.obtenerObrasSociales();

        res.status(200).json(obrasSociales);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Obtener una obra social por ID
export const obtenerObraSocialPorId = async (req, res) => {

    try {

        const obraSocial =
            await obrasSocialesService.obtenerObraSocialPorId(
                req.params.id
            );

        res.status(200).json(obraSocial);

    } catch (error) {

        res.status(404).json({
            message: error.message
        });

    }

};


// Crear obra social
export const crearObraSocial = async (req, res) => {

    try {

        const obraSocial =
            await obrasSocialesService.crearObraSocial(
                req.body
            );

        res.status(201).json({

            message: 'Obra social creada correctamente.',

            obraSocial

        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// Editar obra social
export const editarObraSocial = async (req, res) => {

    try {

        const obraSocial =
            await obrasSocialesService.editarObraSocial(

                req.params.id,

                req.body

            );

        res.status(200).json({

            message: 'Obra social actualizada correctamente.',

            obraSocial

        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// Eliminar obra social
export const remove = async (req, res) => {

    try {

        await obrasSocialesService.remove(
            req.params.id
        );

        res.status(200).json({

            message: 'Obra social eliminada correctamente.'

        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};