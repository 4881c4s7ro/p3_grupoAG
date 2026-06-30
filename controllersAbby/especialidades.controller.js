import * as especialidadesService from '../services/especialidades.service.js';

// Devuelve todas las especialidades cargadas
export const getAll = async (req, res) => {
    const data = await especialidadesService.getAll();

    res.status(200).json({
        ok: true,
        data
    });
};

// Busca una especialidad según el id recibido
export const getById = async (req, res) => {
    const data = await especialidadesService.getById(req.params.id);

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

    await especialidadesService.create(nombre);

    res.status(201).json({
        ok: true,
        message: 'Especialidad creada'
    });
};

// Modifica el nombre de una especialidad
export const update = async (req, res) => {
    const { nombre } = req.body;

    await especialidadesService.update(req.params.id, nombre);

    res.status(200).json({
        ok: true,
        message: 'Especialidad actualizada'
    });
};

// Baja lógica de la especialidad
export const remove = async (req, res) => {
    await especialidadesService.remove(req.params.id);

    res.status(200).json({
        ok: true,
        message: 'Especialidad eliminada'
    });
};


import * as especialidadesService from '../services/especialidades.service.js';


//---------------------------------------------------------
// Administrador - Listar especialidades
//---------------------------------------------------------
export const listarEspecialidades = async (req, res) => {

    try {

        const resultado =
            await especialidadesService.listarEspecialidades(
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
// Administrador - Crear especialidad
//---------------------------------------------------------
export const crearEspecialidad = async (req, res) => {

    try {

        const resultado =
            await especialidadesService.crearEspecialidad(
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
// Administrador - Editar especialidad
//---------------------------------------------------------
export const editarEspecialidad = async (req, res) => {

    try {

        const resultado =
            await especialidadesService.editarEspecialidad(
                req.body
            );

        res.status(200).json(resultado);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

};