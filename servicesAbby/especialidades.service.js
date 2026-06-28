import * as repository from '../repositories/especialidades.repository.js';

// Pide todas las especialidades al repository
export const getAll = async () => {
    return await repository.getAll();
};

// Busca una especialidad por id
export const getById = async (id) => {
    return await repository.getById(id);
};

// Manda a crear una especialidad nueva
export const create = async (nombre) => {
    return await repository.create(nombre);
};

// Actualiza una especialidad existente
export const update = async (id, nombre) => {
    return await repository.update(id, nombre);
};

// Hace el borrado logico de la especialidad
export const remove = async (id) => {
    return await repository.remove(id);
};