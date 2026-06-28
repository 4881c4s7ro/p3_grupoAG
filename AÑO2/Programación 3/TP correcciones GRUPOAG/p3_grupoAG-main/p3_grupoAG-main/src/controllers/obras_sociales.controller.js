import * as obrasSocialesService from "../services/obras_sociales.services.js";

export const listar = async (req, res) => {
    try {
        const resultado = await obrasSocialesService.listar();
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

export const crear = async (req, res) => {
    try {
        const resultado = await obrasSocialesService.crear(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

export const editar = async (req, res) => {
    try {
        const resultado = await obrasSocialesService.editar(
            req.params.id,
            req.body
        );
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

export const eliminar = async (req, res) => {
    try {
        const resultado = await obrasSocialesService.eliminar(req.params.id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};