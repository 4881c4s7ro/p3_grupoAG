import * as usuariosRepository from '../repositories/usuarios.repository.js';
import * as medicosRepository from '../repositories/medicos.repository.js';
import * as obrasSocialesRepository from '../repositories/obras_sociales.repository.js';
import * as medicosObrasSocialesRepository from '../repositories/medicos_obras_sociales.repository.js';


export const asociarMedicoObraSocial = async (
    documentoAdministrador,
    emailAdministrador,
    documentoMedico,
    emailMedico,
    datosObraSocial
) => {

    const {
        nombre,
        descripcion,
        porcentaje_descuento,
        es_particular
    } = datosObraSocial;


    // =====================================================
    // 1. Validar administrador
    // =====================================================

    const administrador =
        await usuariosRepository.getByDocumentoYEmail(
            documentoAdministrador,
            emailAdministrador
        );

    if (!administrador) {

        throw new Error(
            'No existe un usuario registrado con ese DNI y email.'
        );

    }

    if (administrador.rol !== 3) {

        throw new Error(
            'El usuario no está autorizado para realizar esta operación.'
        );

    }


    // =====================================================
    // 2. Validar usuario médico
    // =====================================================

    const usuarioMedico =
        await usuariosRepository.getByDocumentoYEmail(
            documentoMedico,
            emailMedico
        );

    if (!usuarioMedico) {

        throw new Error(
            'El médico no existe en el sistema.'
        );

    }

    if (usuarioMedico.rol !== 2) {

        throw new Error(
            'El usuario indicado no corresponde a un médico.'
        );

    }


    // =====================================================
    // 3. Obtener datos profesionales del médico
    // =====================================================

    const medico =
        await medicosRepository.getByUsuario(
            usuarioMedico.id_usuario
        );

    if (!medico) {

        throw new Error(
            'No existe información profesional para ese médico.'
        );

    }


    // =====================================================
    // 4. Buscar la obra social
    // =====================================================

    let obraSocial =
        await obrasSocialesRepository.getByNombre(nombre);


    // =====================================================
    // 5. Si no existe, crearla
    // =====================================================

    if (!obraSocial) {

        const idObraSocial =
            await obrasSocialesRepository.create(
                nombre,
                descripcion,
                porcentaje_descuento,
                es_particular
            );

        obraSocial =
            await obrasSocialesRepository.getById(
                idObraSocial
            );

    }


    // =====================================================
    // 6. Verificar si la asociación ya existe
    // =====================================================

    const asociacionExistente =
        await medicosObrasSocialesRepository.getByMedicoYObraSocial(
            medico.id_medico,
            obraSocial.id_obra_social
        );

    if (asociacionExistente) {

        throw new Error(
            'El médico ya se encuentra asociado a esa obra social.'
        );

    }


    // =====================================================
    // 7. Crear asociación
    // =====================================================

    await medicosObrasSocialesRepository.create(
        medico.id_medico,
        obraSocial.id_obra_social
    );


    // =====================================================
    // 8. Obtener la asociación creada
    // =====================================================

    const nuevaAsociacion =
        await medicosObrasSocialesRepository.getByMedicoYObraSocial(
            medico.id_medico,
            obraSocial.id_obra_social
        );


    // =====================================================
    // 9. Devolver resultado
    // =====================================================

    return {

        mensaje: 'La obra social fue asociada correctamente al médico.',

        asociacion: nuevaAsociacion

    };

};