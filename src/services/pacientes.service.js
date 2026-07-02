import * as pacientesRepository from '../repositories/pacientes.repository.js';
import * as obrasSocialesRepository
from '../repositories/obras_sociales.repository.js';

/*
=========================================
OBTENER TODOS
=========================================
*/
export const getAll = async () => {

    return await pacientesRepository.getAll();

};

/*
=========================================
OBTENER POR ID
=========================================
*/
export const getById = async (id) => {

    const paciente = await pacientesRepository.getById(id);

    if (!paciente) {
        throw new Error('El paciente no existe.');
    }

    return paciente;

};

/*
=========================================
OBTENER POR USUARIO
=========================================
*/
export const getByUsuario = async (idUsuario) => {

    const paciente = await pacientesRepository.getByUsuario(
        idUsuario
    );

    if (!paciente) {
        throw new Error('El paciente no existe.');
    }

    return paciente;

};

/*
=========================================
CREAR PACIENTE
=========================================
*/
export const create = async (paciente) => {

    // Verificar que no exista un paciente para ese usuario
    const existe = await pacientesRepository.getByUsuario(
        paciente.id_usuario
    );

    if (existe) {
        throw new Error(
            'El usuario ya posee un registro de paciente.'
        );
    }

    // Verificar obra social
    const obraSocial =
        await obrasSocialesRepository.getById(
            paciente.id_obra_social
        );

    if (!obraSocial) {
        throw new Error(
            'La obra social indicada no existe.'
        );
    }

    const result =
        await pacientesRepository.create(paciente);

    return await pacientesRepository.getById(
        result.insertId
    );

};

/*
=========================================
ACTUALIZAR PACIENTE
=========================================
*/
export const update = async (id, paciente) => {

    const pacienteActual =
        await pacientesRepository.getById(id);

    if (!pacienteActual) {
        throw new Error('El paciente no existe.');
    }

    const pacienteUsuario =
        await pacientesRepository.getByUsuario(
            paciente.id_usuario
        );

    if (
        pacienteUsuario &&
        pacienteUsuario.id_paciente != id
    ) {
        throw new Error(
            'Ese usuario ya pertenece a otro paciente.'
        );
    }

    const obraSocial =
        await obrasSocialesRepository.getById(
            paciente.id_obra_social
        );

    if (!obraSocial) {
        throw new Error(
            'La obra social indicada no existe.'
        );
    }

    await pacientesRepository.update(
        id,
        paciente
    );

    return await pacientesRepository.getById(id);

};

/*
=========================================
PACIENTES POR OBRA SOCIAL
=========================================
*/
export const getByObraSocial = async (
    idObraSocial
) => {

    const obraSocial =
        await obrasSocialesRepository.getById(
            idObraSocial
        );

    if (!obraSocial) {
        throw new Error(
            'La obra social no existe.'
        );
    }

    return await pacientesRepository.getByObraSocial(
        idObraSocial
    );

};

/*
=========================================
ELIMINAR PACIENTE
=========================================
*/
export const remove = async (id) => {

    const paciente =
        await pacientesRepository.getById(id);

    if (!paciente) {
        throw new Error(
            'El paciente no existe.'
        );
    }

    await pacientesRepository.remove(id);

};