import * as especialidadesRepository from '../repositories/especialidades.repository.js';

// Obtener todas las especialidades
export const getAll = async () => {

    return await especialidadesRepository.getAll();

};

// Obtener una especialidad por ID
export const getById = async (id) => {

    const especialidad = await especialidadesRepository.getById(id);

    if (!especialidad) {
        throw new Error('La especialidad no existe.');
    }

    return especialidad;

};

// Crear una especialidad
export const create = async (nombre) => {

    const existe = await especialidadesRepository.getByNombre(nombre);

    if (existe) {
        throw new Error('La especialidad ya existe.');
    }

    const result = await especialidadesRepository.create(nombre);

    return await especialidadesRepository.getById(result.insertId);

};

// Actualizar una especialidad
export const update = async (id, nombre) => {

    const especialidad = await especialidadesRepository.getById(id);

    if (!especialidad) {
        throw new Error('La especialidad no existe.');
    }

    const repetida = await especialidadesRepository.getByNombre(nombre);

    if (
        repetida &&
        repetida.id_especialidad != id
    ) {
        throw new Error(
            'Ya existe una especialidad con ese nombre.'
        );
    }

    await especialidadesRepository.update(id, nombre);

    return await especialidadesRepository.getById(id);

};

// Eliminar (soft delete)
export const remove = async (id) => {

    const especialidad = await especialidadesRepository.getById(id);

    if (!especialidad) {
        throw new Error('La especialidad no existe.');
    }

    await especialidadesRepository.remove(id);

};