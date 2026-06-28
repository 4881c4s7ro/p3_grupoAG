import * as usuariosRepository from '../repositories/usuarios.repository.js';
import * as especialidadesRepository from '../repositories/especialidades.repository.js';
import * as medicosRepository from '../repositories/medicos.repository.js';

;


export const asociarEspecialidadAMedico = async (
    documentoAdministrador,
    emailAdministrador,
    documentoMedico,
    emailMedico,
    nombreEspecialidad
) => {

    // Buscar administrador
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

    // Buscar usuario médico
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

    // Buscar médico
    const medico =
        await medicosRepository.getByUsuario(
            usuarioMedico.id_usuario
        );

    if (!medico) {
        throw new Error(
            'No existe información profesional para ese médico.'
        );
    }

    // Buscar especialidad
    const especialidad =
        await especialidadesRepository.getByNombre(
            nombreEspecialidad
        );

    if (!especialidad) {
        throw new Error(
            'La especialidad no existe.'
        );
    }

    // Verificar si ya está asociada
    if (medico.id_especialidad === especialidad.id_especialidad) {

        throw new Error(
            'El médico ya se encuentra asociado a esa especialidad.'
        );

    }

    // Actualizar
    await medicosRepository.update(
        medico.id_medico,
        {
            ...medico,
            id_especialidad: especialidad.id_especialidad
        }
    );

    // Obtener nuevamente el médico
    const medicoActualizado =
        await medicosRepository.getById(
            medico.id_medico
        );

    return {

        mensaje: 'Especialidad asociada correctamente al médico.',

        medico: medicoActualizado

    };

};
export const listarMedicosPorEspecialidad = async (
    documentoPaciente,
    emailPaciente,
    nombreEspecialidad
) => {

    // 1. Buscar usuario
    const usuario =
        await usuariosRepository.getByDocumentoYEmail(
            documentoPaciente,
            emailPaciente
        );

    if (!usuario) {

        throw new Error(
            'No existe un usuario registrado con ese DNI y email.'
        );

    }


    // 2. Verificar rol
    if (usuario.rol !== 'PACIENTE') {

        throw new Error(
            'El usuario no está autorizado a realizar la operación.'
        );

    }


    // 3. Buscar especialidad
    const especialidad =
        await especialidadesRepository.getByNombre(
            nombreEspecialidad
        );

    if (!especialidad) {

        throw new Error(
            'La especialidad no es atendida en este centro médico.'
        );

    }


    // 4. Obtener médicos
    const medicos =
        await medicosRepository.getAllByEspeciality(
            especialidad.id_especialidad
        );


    if (medicos.length === 0) {

        throw new Error(
            'No existen médicos que atiendan la especialidad solicitada.'
        );

    }


    // 5. Devolver listado
    return medicos;

};