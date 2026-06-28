const medicosService = require("../services/medicos.services");

exports.listar = async (req, res) => {
    try {
        const datos = await medicosService.listar();
        res.status(200).json(datos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.listarPorEspecialidad = async (req, res) => {
    try {
        const datos = await medicosService.listarPorEspecialidad(req.params.id);
        res.status(200).json(datos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.asociarEspecialidad = async (req, res) => {
    try {
        const resultado = await medicosService.asociarEspecialidad(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.asociarObraSocial = async (req, res) => {
    try {
        const resultado = await medicosService.asociarObraSocial(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};