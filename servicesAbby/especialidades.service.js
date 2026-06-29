
import * as usuariosRepository from '../repositories/usuarios.repository.js';
import * as especialidadesRepository from '../repositories/especialidades.repository.js';





// Pide todas las especialidades al repository
export const getAll = async () => {
    return await especialidadesRepository.getAll();
};

// Busca una especialidad por id
export const getById = async (id) => {
    return await especialidadesRepository.getById(id);
};

// Manda a crear una especialidad nueva
export const create = async (nombre) => {
    return await especialidadesRepository.create(nombre);
};

// Actualiza una especialidad existente
export const update = async (datos) => {
    const {
        id, 
        nombre
    } = datos;
    return await especialidadesRepository.update(id, nombre);
};

// Hace el borrado logico de la especialidad
export const remove = async (id) => {
    return await especialidadesRepository.remove(id);
};



export const crearEspecialidad = async (datos) => {

    const {
        documentoAdministrador,
        emailAdministrador,
        nombreEspecialidad
    } = datos;

    // 1. Buscar usuario administrador
    const usuario = await usuariosRepository.getByDocumentoYEmail(
        documentoAdministrador,
        emailAdministrador
    );

    if (!usuario) {
        throw new Error(
            'No existe un usuario registrado con ese DNI y email.'
        );
    }

    // 2. Verificar que sea administrador
    if (usuario.rol !== 3) {
        throw new Error(
            'El usuario no está autorizado para realizar esta operación.'
        );
    }

    // 3. Buscar la especialidad
    let especialidad = await especialidadesRepository.getByNombre(
        nombreEspecialidad
    );

    // 4. Si ya existe, devolverla
    if (especialidad) {

        return {
            mensaje: 'La especialidad ya existe.',
            especialidad
        };

    }

    // 5. Crear la especialidad
    const idEspecialidad = await especialidadesRepository.create(
        nombreEspecialidad
    );

    // 6. Obtener la especialidad recién creada
    especialidad = await especialidadesRepository.getById(
        idEspecialidad
    );

    // 7. Devolver el resultado
    return {
        mensaje: 'Especialidad creada correctamente.',
        especialidad
    };

};




export const editarEspecialidad = async (
    documentoAdministrador,
    emailAdministrador,
    nombreEspecialidad,
    nuevoNombreEspecialidad
) => {

    // 1. Buscar usuario administrador
    const usuario = await usuariosRepository.getByDocumentoYEmail(
        documentoAdministrador,
        emailAdministrador
    );

    if (!usuario) {
        throw new Error(
            'No existe un usuario registrado con ese DNI y email.'
        );
    }


    // 2. Verificar que sea administrador
    if (usuario.rol !== 3) {
        throw new Error(
            'El usuario no está autorizado para realizar esta operación.'
        );
    }


    // 3. Buscar la especialidad a modificar
    const especialidad =
        await especialidadesRepository.getByNombre(
            nombreEspecialidad
        );

    if (!especialidad) {
        throw new Error(
            'La especialidad indicada no existe en este centro médico.'
        );
    }


    // 4. Verificar que el nuevo nombre no exista
    const especialidadNueva =
        await especialidadesRepository.getByNombre(
            nuevoNombreEspecialidad
        );

    if (especialidadNueva &&
        especialidadNueva.id_especialidad !== especialidad.id_especialidad) {

        throw new Error(
            'Ya existe una especialidad con ese nombre.'
        );

    }


    // 5. Actualizar
    await especialidadesRepository.update(
        especialidad.id_especialidad,
        nuevoNombreEspecialidad
    );


    // 6. Obtener la especialidad actualizada
    const especialidadActualizada =
        await especialidadesRepository.getById(
            especialidad.id_especialidad
        );


    // 7. Devolver resultado
    return {

        mensaje: 'Especialidad actualizada correctamente.',

        especialidad: especialidadActualizada

    };

};




export const listarEspecialidades = async (
    documentoAdministrador,
    emailAdministrador
) => {

    // 1. Buscar usuario administrador
    const usuario = await usuariosRepository.getByDocumentoYEmail(
        documentoAdministrador,
        emailAdministrador
    );

    if (!usuario) {

        throw new Error(
            'No existe un usuario registrado con ese DNI y email.'
        );

    }


    // 2. Verificar que sea administrador
    if (usuario.rol !== 3) {

        throw new Error(
            'El usuario no está autorizado para realizar esta operación.'
        );

    }


    // 3. Obtener todas las especialidades
    const especialidades =
        await especialidadesRepository.getAll();


    // 4. Verificar si existen especialidades
    if (especialidades.length === 0) {

        throw new Error(
            'El centro médico no tiene especialidades para atender.'
        );

    }


    // 5. Devolver resultado
    return {

        mensaje: 'Especialidades obtenidas correctamente.',

        especialidades

    };

};