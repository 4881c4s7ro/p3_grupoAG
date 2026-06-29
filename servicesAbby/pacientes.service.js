import * as usuariosRepository from '../repositories/usuarios.repository.js';
import * as pacientesRepository from '../repositories/pacientes.repository.js';
import * as obrasSocialesRepository from '../repositories/obras_sociales.repository.js';
import * as especialidadesRepository from '../repositories/especialidades.repository.js';


export const asociarObraSocial = async (datos) => {

    const {
        documentoAdministrador,
        emailAdministrador,
        documentoPaciente,
        emailPaciente,
        nombreObraSocial
    } = datos;

    //====================================================
    // Validar administrador
    //====================================================

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


    //====================================================
    // Validar usuario paciente
    //====================================================

    const usuarioPaciente =
        await usuariosRepository.getByDocumentoYEmail(
            documentoPaciente,
            emailPaciente
        );

    if (!usuarioPaciente) {

        throw new Error(
            'El paciente no existe en el sistema.'
        );

    }

    if (usuarioPaciente.rol !== 1) {

        throw new Error(
            'El usuario indicado no corresponde a un paciente.'
        );

    }


    //====================================================
    // Obtener paciente
    //====================================================

    const paciente =
        await pacientesRepository.getByUsuario(
            usuarioPaciente.id_usuario
        );

    if (!paciente) {

        throw new Error(
            'No existe información del paciente.'
        );

    }


    //====================================================
    // Buscar obra social
    //====================================================

    let obraSocial =
        await obrasSocialesRepository.getByNombre(
            nombreObraSocial
        );


    // Si no existe se asigna Particular

    if (!obraSocial) {

        obraSocial =
            await obrasSocialesRepository.getParticular();

        if (!obraSocial) {

            throw new Error(
                'No existe la obra social Particular registrada.'
            );

        }

    }


    //====================================================
    // Verificar si ya posee esa obra social
    //====================================================

    if (
        paciente.id_obra_social ===
        obraSocial.id_obra_social
    ) {

        throw new Error(
            'El paciente ya posee esa obra social.'
        );

    }


    //====================================================
    // Asociar obra social
    //====================================================

    await pacientesRepository.asociarObraSocial(
        paciente.id_paciente,
        obraSocial.id_obra_social
    );


    //====================================================
    // Obtener paciente actualizado
    //====================================================

    const pacienteActualizado =
        await pacientesRepository.getById(
            paciente.id_paciente
        );


    return pacienteActualizado;

};

export const listarEspecialidades = async () => {

    
}