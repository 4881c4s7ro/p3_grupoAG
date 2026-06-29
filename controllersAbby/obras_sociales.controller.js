import * as obrasSocialesService from '../services/obras_sociales.service.js';


//---------------------------------------------------------
// Administrador - Listar obras sociales
//---------------------------------------------------------
export const listarObrasSociales = async (req, res) => {

    try {

        const resultado =
            await obrasSocialesService.listarObrasSociales(
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
// Administrador - Crear obra social
//---------------------------------------------------------
export const crearObraSocial = async (req, res) => {

    try {

        const resultado =
            await obrasSocialesService.crearObraSocial(
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
// Administrador - Editar obra social
//---------------------------------------------------------
export const editarObraSocial = async (req, res) => {

    try {

        const resultado =
            await obrasSocialesService.editarObraSocial(
                req.body
            );

        res.status(200).json(resultado);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

};