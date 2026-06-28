import * as estadisticasService from "../services/estadisticas.services.js";

export const obtenerEstadisticas = async (req, res) => {
    try {
        const resultado = await estadisticasService.obtenerEstadisticas();
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

export const generarPDF = async (req, res) => {
    try {
        const resultado = await estadisticasService.generarPDF();

        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};