import * as service from '../services/especialidades.service.js';

// Trae todas las especialidades activas
export const getAll = async (req, res) => {

    const data = await service.getAll();

    res.status(200).json({
        ok: true,
        data
    });
};

// Busca una especialidad por id
export const getById = async (req, res) => {

    const data = await service.getById(req.params.id);

    // Si no encuentra nada devuelve 404
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

// Crea una especialidad nueva
export const create = async (req, res) => {

    // Saco el nombre que viene en el body
    const { nombre } = req.body;

    await service.create(nombre);

    res.status(201).json({
        ok: true,
        message: 'Especialidad creada'
    });
};

// Actualiza una especialidad
export const update = async (req, res) => {

    const { nombre } = req.body;

    await service.update(req.params.id, nombre);

    res.status(200).json({
        ok: true,
        message: 'Especialidad actualizada'
    });
};

// Hace un borrado logico cambiando activo a 0
export const remove = async (req, res) => {

    await service.remove(req.params.id);

    res.status(200).json({
        ok: true,
        message: 'Especialidad eliminada'
    });
};