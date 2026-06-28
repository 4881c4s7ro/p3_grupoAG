import * as usuariosRepository from '../repositories/usuarios.repository.js';
import * as obrasSocialesRepository from '../repositories/obras_sociales.repository.js';




export const crearObraSocial = async (
    documentoAdministrador,
    emailAdministrador,
    datosObraSocial
) => {

    const {
        nombre,
        descripcion,
        porcentaje_descuento,
        es_particular
    } = datosObraSocial;


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


    // 2. Verificar permisos
    if (usuario.rol !== 3) {

        throw new Error(
            'El usuario no está autorizado para realizar esta operación.'
        );

    }


    // 3. Verificar que la obra social no exista
    const obraSocialExistente =
        await obrasSocialesRepository.getByNombre(nombre);

    if (obraSocialExistente) {

        throw new Error(
            'La obra social ya existe.'
        );

    }


    // 4. Crear la obra social
    const idObraSocial =
        await obrasSocialesRepository.create(
            nombre,
            descripcion,
            porcentaje_descuento,
            es_particular
        );


    // 5. Obtener la obra social creada
    const obraSocial =
        await obrasSocialesRepository.getById(idObraSocial);


    // 6. Devolver resultado
    return {

        mensaje: 'Obra social creada correctamente.',

        obraSocial

    };

};

export const listarObrasSociales = async (
    documentoAdministrador,
    emailAdministrador
) => {

    // 1. Buscar usuario
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


    // 3. Obtener todas las obras sociales activas
    const obrasSociales =
        await obrasSocialesRepository.getAll();


    // 4. Verificar si existen obras sociales
    if (obrasSociales.length === 0) {

        throw new Error(
            'El centro médico aún no presta servicio con ninguna obra social.'
        );

    }


    // 5. Devolver resultado
    return {

        mensaje: 'Obras sociales obtenidas correctamente.',

        obrasSociales

    };

};

export const editarObraSocial = async (
    documentoAdministrador,
    emailAdministrador,
    nombreObraSocial,
    nuevosDatos
) => {

    const {
        nombre,
        descripcion,
        porcentaje_descuento,
        es_particular
    } = nuevosDatos;


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


    // 2. Verificar permisos
    if (usuario.rol !== 3) {

        throw new Error(
            'El usuario no está autorizado para realizar esta operación.'
        );

    }


    // 3. Buscar la obra social
    const obraSocial =
        await obrasSocialesRepository.getByNombre(nombreObraSocial);

    if (!obraSocial) {

        throw new Error(
            'La obra social no existe.'
        );

    }


    // 4. Si cambia el nombre, verificar que el nuevo no exista
    if (nombre !== obraSocial.nombre) {

        const obraSocialDuplicada =
            await obrasSocialesRepository.getByNombre(nombre);

        if (obraSocialDuplicada) {

            throw new Error(
                'Ya existe una obra social con ese nombre.'
            );

        }

    }


    // 5. Actualizar
    await obrasSocialesRepository.update(
        obraSocial.id_obra_social,
        nombre,
        descripcion,
        porcentaje_descuento,
        es_particular
    );


    // 6. Obtener nuevamente la obra social actualizada
    const obraSocialActualizada =
        await obrasSocialesRepository.getById(
            obraSocial.id_obra_social
        );


    // 7. Devolver resultado
    return {

        mensaje: 'Obra social actualizada correctamente.',

        obraSocial: obraSocialActualizada

    };

};