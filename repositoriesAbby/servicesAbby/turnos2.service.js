import {
 obtenerTurnosPorMedico
}
from "../repositories/turnos_reservas.repository.js";

import {
 obtenerMedicoPorDocumento,
 obtenerPacientePorDocumento,
 marcarTurnoAtendido

} from "../repositories/turnos_reservas.repository.js";


import {
 obtenerReservasPaciente

} from "../repositories/turnos_reservas.repository.js";


export const listarTurnosMedico = async(id_medico)=>{


    if(!id_medico){
        throw new Error(
          "Debe indicar el médico"
        );
    }


    return await obtenerTurnosPorMedico(id_medico);

};

export const atenderTurno = async(datos)=>{


const {
    dni_medico,
    dni_paciente,
    fecha_hora

}=datos;



const medico =
await obtenerMedicoPorDocumento(dni_medico);



if(!medico){

    throw new Error(
      "No existe el médico"
    );

}



const paciente =
await obtenerPacientePorDocumento(dni_paciente);



if(!paciente){

    throw new Error(
      "No existe el paciente"
    );

}



const resultado =
await marcarTurnoAtendido(
    medico.id_medico,
    paciente.id_paciente,
    fecha_hora
);



if(resultado.affectedRows === 0){

 throw new Error(
 "No existe turno para ese médico, paciente y fecha"
 );

}



return {
 mensaje:"Turno marcado como atendido"
};


}

export const listarReservasPaciente = async(datos)=>{


const {
 dni,
 nombre,
 apellido

}=datos;



if(!dni || !nombre || !apellido){

 throw new Error(
 "Debe ingresar dni, nombre y apellido"
 );

}



const turnos =
await obtenerReservasPaciente(
    dni,
    nombre,
    apellido
);



return turnos;


}

