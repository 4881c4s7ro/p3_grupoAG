import * as service from '../services/especialidades.service.js';

// Devuelve todas las especialidades cargadas
export const getAll = async (req, res) => {
    const data = await service.getAll();

    res.status(200).json({
        ok: true,
        data
    });
};

// Busca una especialidad según el id recibido
export const getById = async (req, res) => {
    const data = await service.getById(req.params.id);

    // Si no existe se devuelve un 404
    if (!data) {
        return res.status(404).json({
            ok: false,
            message: 'Especialidad no encontrada'
        });
    }

    res.status(200).json({
        ok: true,
        data
    });
};

// Alta de una nueva especialidad
export const create = async (req, res) => {
    const { nombre } = req.body;

    await service.create(nombre);

    res.status(201).json({
        ok: true,
        message: 'Especialidad creada'
    });
};

// Modifica el nombre de una especialidad
export const update = async (req, res) => {
    const { nombre } = req.body;

    await service.update(req.params.id, nombre);

    res.status(200).json({
        ok: true,
        message: 'Especialidad actualizada'
    });
};

// Baja lógica de la especialidad
export const remove = async (req, res) => {
    await service.remove(req.params.id);

    res.status(200).json({
        ok: true,
        message: 'Especialidad eliminada'
    });
};