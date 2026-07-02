import * as medicosRepository from '../repositories/medicos.repository.js';
import * as especialidadesRepository from '../repositories/especialidades.repository.js';

/*
=========================================
OBTENER TODOS
=========================================
*/
export const getAll = async () => {

    return await medicosRepository.getAll();

};

/*
=========================================
OBTENER POR ID
=========================================
*/
export const getById = async (id) => {

    const medico = await medicosRepository.getById(id);

    if (!medico) {
        throw new Error('El médico no existe.');
    }

    return medico;

};

/*
=========================================
CREAR MÉDICO
=========================================
*/
export const create = async (medico) => {

    // Verificar matrícula
    const existe = await medicosRepository.getByMatricula(
        medico.matricula
    );

    if (existe) {
        throw new Error('La matrícula ya se encuentra registrada.');
    }

    // Verificar especialidad
    const especialidad =
        await especialidadesRepository.getById(
            medico.id_especialidad
        );

    if (!especialidad) {
        throw new Error('La especialidad indicada no existe.');
    }

    const result =
        await medicosRepository.create(medico);

    return await medicosRepository.getById(
        result.insertId
    );

};

/*
=========================================
ACTUALIZAR MÉDICO
=========================================
*/
export const update = async (id, medico) => {

    const medicoActual =
        await medicosRepository.getById(id);

    if (!medicoActual) {
        throw new Error('El médico no existe.');
    }

    const matricula =
        await medicosRepository.getByMatricula(
            medico.matricula
        );

    if (
        matricula &&
        matricula.id_medico != id
    ) {

        throw new Error(
            'La matrícula pertenece a otro médico.'
        );

    }

    const especialidad =
        await especialidadesRepository.getById(
            medico.id_especialidad
        );

    if (!especialidad) {
        throw new Error('La especialidad indicada no existe.');
    }

    await medicosRepository.update(id, medico);

    return await medicosRepository.getById(id);

};

/*
=========================================
ASOCIAR ESPECIALIDAD
=========================================
*/
export const asociarEspecialidad = async (
    idMedico,
    idEspecialidad
) => {

    const medico =
        await medicosRepository.getById(idMedico);

    if (!medico) {
        throw new Error('El médico no existe.');
    }

    const especialidad =
        await especialidadesRepository.getById(
            idEspecialidad
        );

    if (!especialidad) {
        throw new Error('La especialidad no existe.');
    }

    if (
        medico.id_especialidad === idEspecialidad
    ) {

        throw new Error(
            'El médico ya posee esa especialidad.'
        );

    }

    await medicosRepository.update(
        idMedico,
        {
            ...medico,
            id_especialidad: idEspecialidad
        }
    );

    return await medicosRepository.getById(
        idMedico
    );

};

/*
=========================================
LISTAR POR ESPECIALIDAD
=========================================
*/
export const getByEspecialidad = async (
    idEspecialidad
) => {

    const especialidad =
        await especialidadesRepository.getById(
            idEspecialidad
        );

    if (!especialidad) {
        throw new Error('La especialidad no existe.');
    }

    return await medicosRepository.getAllByEspeciality(
        idEspecialidad
    );

};

/*
=========================================
ELIMINAR
=========================================
*/
export const remove = async (id) => {

    const medico =
        await medicosRepository.getById(id);

    if (!medico) {
        throw new Error('El médico no existe.');
    }

    await medicosRepository.remove(id);

};