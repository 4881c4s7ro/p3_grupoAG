import * as usuariosRepository from '../repositories/usuarios.repository.js';
import * as pacientesRepository from '../repositories/pacientes.repository.js';
import * as especialidadesRepository from '../repositories/especialidades.repository.js';
import * as medicosRepository from '../repositories/medicos.repository.js';
import * as medicosObrasSocialesRepository from '../repositories/medicos_obras_sociales.repository.js';
import * as obrasSocialesRepository from '../repositories/obras_sociales.repository.js';
import * as turnosReservasRepository from '../repositories/turnos_reservas.repository.js';


// Marcar un turno como atendido
export const atenderTurnoMedico = async (datos) => {

    const {
         documentoMedico,
        emailMedico,
        documentoPaciente,
        emailPaciente,
        fechaHora
    } = datos;

    // 1. Verificar que exista el médico
    const medico = await usuariosRepository.getMedicoByDocumentoYEmail(
        documentoMedico,
        emailMedico
    );

    if (!medico) {
        throw new Error('El médico no existe en el sistema.');
    }

    // 2. Verificar que exista el paciente
    const paciente = await usuariosRepository.getPacienteByDocumentoYEmail(
        documentoPaciente,
        emailPaciente
    );

    if (!paciente) {
        throw new Error('El paciente no existe en el sistema.');
    }
// 3. Marcar el turno como atendido
 const filasActualizadas =
        await turnosReservasRepository.marcarTurnoComoAtendido(
            documentoMedico,
            documentoPaciente,
            fechaHora
        );

    // 4. Verificar que el turno exista
if (filasActualizadas === 0) {
        throw new Error(
            'No existe un turno para los datos ingresados.'
        );
    }

    // 5. Operación realizada correctamente
    return {
        mensaje: 'El turno fue marcado como atendido correctamente.'
    };

};

export const validarReservaTurno = async (datos) => {

    const {
        documentoPaciente,
        emailPaciente,
        nombreEspecialidad,
        idMedico,
        fechaHora
    } = datos;


    // Buscar usuario
    const usuario = await usuariosRepository.getByDocumentoYEmail(
        documentoPaciente,
        emailPaciente
    );

    if (!usuario) {
        throw new Error('El paciente no existe en el sistema.');
    }

    /* falta aqui , que si yo ingreso por primera vez a un consultorio y quiero sacar un turno, debo
    darme de alta con todos mis datos*/


    // Verificar rol
    if (usuario.rol !== 'PACIENTE') {
        throw new Error(
            'El usuario no está autorizado para esta operación.'
        );
    }


    // Buscar especialidad
    const especialidad =
        await especialidadesRepository.getByNombre(
            nombreEspecialidad
        );

    if (!especialidad) {
        throw new Error(
            'La especialidad solicitada no es atendida en este centro médico.'
        );
    }


    // Buscar médico
    const medico =
        await medicosRepository.getById(idMedico);

    if (!medico) {
        throw new Error('El médico seleccionado no existe.');
    }


    if (medico.id_especialidad !== especialidad.id_especialidad) {
        throw new Error(
            'El médico no pertenece a la especialidad seleccionada.'
        );
    }


    // Buscar paciente
    const paciente =
        await pacientesRepository.getByUsuario(
            usuario.id_usuario
        );

    if (!paciente) {
        throw new Error(
            'El paciente no se encuentra registrado.'
        );
    }


    // Obtener obra social
    let obraSocial =
        await obrasSocialesRepository.obtener_ObraSocial_id(
            paciente.id_obra_social
        );


    // Verificar si el médico atiende esa obra social
    const atiende =
        await medicosObrasSocialesRepository.existeRelacion(
            medico.id_medico,
            obraSocial.id_obra_social
        );


    // Si no la atiende se utilizará PARTICULAR
    if (!atiende) {

        obraSocial =
            await obrasSocialesRepository.getParticular();

    }


    // Validar fecha
    const fecha = new Date(fechaHora);

    const anioActual = new Date().getFullYear();

    if (fecha.getFullYear() !== anioActual) {

        throw new Error(
            'La fecha ingresada es incorrecta.'
        );

    }


    // Validar horario
    const hora = fecha.getHours();

    if (hora < 8 || hora >= 20) {

        throw new Error(
            'La hora ingresada es incorrecta.'
        );

    }


    // Verificar disponibilidad del médico
    const ocupado =
        await turnosReservasRepository.existeTurno(
            medico.id_medico,
            fechaHora
        );

    if (ocupado) {

        throw new Error(
            'El médico ya posee un turno asignado para esa fecha y horario.'
        );

    }


    // Devuelve toda la información necesaria
    return {

        medico,
        paciente,
        obraSocial,
        fechaHora

    };

};


//---------------------------------------------------------
// Registrar un turno para un paciente (ROL PACIENTE)
//---------------------------------------------------------
export const reservarPacienteTurno = async (datos) => {

    // Ejecutar todas las validaciones
    const {

        documento,
        email,
        especialidad,
        fecha_hora

    } = datos;

    const paciente =
        await pacientesRepository.obtenerDatoPaciente(documento, email);

    if (!paciente) {
        console.log("chaucaha 1111111111111111111 ");
        throw new Error(    
            "El paciente  no existe en el sistema ."
        );
    }
 // dveevuele el primer medico con esa especialidad

    const medico =
        await medicosRepository.ObtenerMedicoEspecialidad(especialidad);

     if (!medico) {
        console.log("chaucaha 22222222222222 ");
        throw new Error(    
            "El medico  no existe en el sistema ."
        );
    }
    // Calcular valor de la consulta
    let valorTotal = parseFloat(
        medico.valor_consulta
    );


    if (paciente.es_particular !== 1) {

        valorTotal =
            valorTotal -
            (
                valorTotal *
                parseFloat(paciente.porcentaje_descuento) /
                100
            );

    }


    // Crear el turno
    const idTurno =
    await turnosReservasRepository.create({

        id_medico: medico.id_medico,
        id_paciente: paciente.id_paciente,
        id_obra_social: paciente.id_obra_social,
        fecha_hora,
        valor_total: valorTotal,
        atentido: 0

    });

    const turno = await turnosReservasRepository.getById(idTurno);

    return turno;


    return nuevoTurno;

};




//---------------------------------------------------------
// Registrar un turno para un paciente (ROL ADMINISTRADOR)
//---------------------------------------------------------
export const registrarTurnoPaciente = async (datos) => {

    const {

        documentoAdministrador,
        emailAdministrador,

        documentoPaciente,
        emailPaciente,

        apellidoPaciente,
        nombresPaciente,

        nombreEspecialidad,
        nombreObraSocial,

        id_medico,

        fecha_hora

    } = datos;


    //-------------------------------------------------
    // 1. Validar administrador
    //-------------------------------------------------

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


    //-------------------------------------------------
    // 2. Validar especialidad
    //-------------------------------------------------

    const especialidad =
        await especialidadesRepository.getByNombre(
            nombreEspecialidad
        );

    if (!especialidad) {

        throw new Error(
            'La especialidad solicitada no está disponible en este centro médico.'
        );

    }


    //-------------------------------------------------
    // 3. Obtener médicos de la especialidad
    //-------------------------------------------------

    const medicos =
        await medicosRepository.getByEspecialidad(
            especialidad.id_especialidad
        );

    if (medicos.length === 0) {

        throw new Error(
            'No existen médicos para atender esa especialidad.'
        );

    }


    //-------------------------------------------------
    // 4. Crear paciente si no existe
    //-------------------------------------------------

    let usuarioPaciente =
        await usuariosRepository.getByDocumentoYEmail(
            documentoPaciente,
            emailPaciente
        );

    if (!usuarioPaciente) {

        await pacientesService.crearPaciente({

            documento: documentoPaciente,
            apellido: apellidoPaciente,
            nombres: nombresPaciente,
            email: emailPaciente

        });

    }


    //-------------------------------------------------
    // 5. Asociar/Cambiar obra social
    //-------------------------------------------------

    await pacientesService.asociarObraSocial(

        documentoAdministrador,
        emailAdministrador,

        documentoPaciente,
        emailPaciente,

        nombreObraSocial

    );


    //-------------------------------------------------
    // 6. Registrar el turno
    //-------------------------------------------------

    const turno =
        await reservarTurno({

            documentoPaciente,
            emailPaciente,

            nombreEspecialidad,

            id_medico,

            fecha_hora

        });


    //-------------------------------------------------
    // 7. Devolver resultado
    //-------------------------------------------------

    return turno;

};


//---------------------------------------------------------
// Lista los turnos de un paciente
//---------------------------------------------------------
export const listarTurnosPaciente = async (datos) => {

    const { documento, email } = datos;

console.log("dentro del servicio antes de buscar al paciente",documento,email);
    const paciente =
        await pacientesRepository.obtenerDatoPaciente(
            documento,
            email
        );


    if (!paciente) {
        console.log("dentro del servicio despues de buscar al paciente",documento,email);
        throw new Error(    
            "El paciente  no existe en el sistema ."
        );
    }

console.log("el id del paciente a buscar es ",paciente.id_paciente);
    const turnos =
        await turnosReservasRepository.listarTurnosPacientes(
            paciente.id_paciente
        );


    if (turnos.length === 0) {
        throw new Error(
            "El paciente no tiene turnos."
        );
    }


    return turnos;
};

// Listar los turnos pendientes de un médico
export const listarTurnosMedico = async (datos) => {

const {
        documento, 
        email
    } = datos;

    // 1. Verificar que exista el usuario
    const medico = await medicosRepository.ObtenerDatosMedico(documento,email);

    if (!medico) {
        throw new Error('El médico no existe en el sistema.');
    }

    // 2. Verificar que sea un médico
    if (medico.rol !== 1) {
        throw new Error('El usuario no corresponde a un médico, acceso denegado a la operacion.');
    }

    // 3. Obtener los turnos pendientes
    const turnos =
        await turnosReservasRepository.listarTurnosMedico(medico.id_medico);

    // 4. Verificar que existan turnos
    if (turnos.length === 0) {
        throw new Error(
            'El médico no tiene turnos pendientes para atender.'
        );
    }

    // 5. Devolver el listado
    return turnos;
};