import * as obrasSocialesRepository from '../repositories/obras_sociales.repository.js';

// Obtener todas las obras sociales
export const obtenerObrasSociales = async () => {

    return await obrasSocialesRepository.obtener_ObrasSociales();

};


// Obtener una obra social por ID
export const obtenerObraSocialPorId = async (id) => {

    const obraSocial =
        await obrasSocialesRepository.obtener_ObraSocial_id(id);

    if (!obraSocial) {

        throw new Error(
            'La obra social no existe.'
        );

    }

    return obraSocial;

};


// Crear una obra social
export const crearObraSocial = async (datos) => {

    const {
        nombre,
        descripcion,
        porcentaje_descuento,
        es_particular
    } = datos;


    const obraSocialExistente =
        await obrasSocialesRepository.obtener_ObraSocial_nombre(
            nombre
        );

    if (obraSocialExistente) {

        throw new Error(
            'La obra social ya existe.'
        );

    }


    const result =
        await obrasSocialesRepository.crear_ObraSocial(

            nombre,

            descripcion,

            porcentaje_descuento,

            es_particular

        );


    return await obrasSocialesRepository.obtener_ObraSocial_id(
        result.insertId
    );

};


// Actualizar obra social
export const editarObraSocial = async (
    id,
    datos
) => {

    const obraSocial =
        await obrasSocialesRepository.obtener_ObraSocial_id(id);

    if (!obraSocial) {

        throw new Error(
            'La obra social no existe.'
        );

    }


    const {
        nombre,
        descripcion,
        porcentaje_descuento,
        es_particular
    } = datos;


    if (nombre !== obraSocial.nombre) {

        const existe =
            await obrasSocialesRepository.obtener_ObraSocial_nombre(
                nombre
            );

        if (existe) {

            throw new Error(
                'Ya existe una obra social con ese nombre.'
            );

        }

    }


    await obrasSocialesRepository.actualizar_ObraSocial(

        id,

        nombre,

        descripcion,

        porcentaje_descuento,

        es_particular

    );


    return await obrasSocialesRepository.obtener_ObraSocial_id(id);

};


// Eliminar (borrado lógico)
export const remove = async (id) => {

    const obraSocial =
        await obrasSocialesRepository.obtener_ObraSocial_id(id);

    if (!obraSocial) {

        throw new Error(
            'La obra social no existe.'
        );

    }


    const result =
        await obrasSocialesRepository.remove(id);

    if (result.affectedRows === 0) {

        throw new Error(
            'No fue posible eliminar la obra social.'
        );

    }

    return true;

};