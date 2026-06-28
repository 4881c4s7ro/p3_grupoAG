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

import {

obtenerPaciente,
obtenerMedicoPorEspecialidad,
obtenerObraSocial,
crearTurno

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


};

export const reservarTurno = async(datos)=>{


const {

documento,
nombre,
apellido,
especialidad,
fecha_hora

}=datos;



// 1) paciente

const paciente =
await obtenerPaciente(
 documento,
 nombre,
 apellido
);



if(!paciente){

 throw new Error(
 "Paciente inexistente"
 );

}



// 2) médico

const medico =
await obtenerMedicoPorEspecialidad(
 especialidad
);



if(!medico){

 throw new Error(
 "No hay médico para esa especialidad"
 );

}



// 3) cobertura

const obraSocial =
await obtenerObraSocial(
 paciente.id_obra_social
);



if(!obraSocial){

 throw new Error(
 "Paciente sin cobertura válida"
 );

}



// 4) calcular valor

let valorTotal;



if(obraSocial.es_particular === 1){


 valorTotal =
 medico.valor_consulta;


}else{


 valorTotal =
 medico.valor_consulta -
 (
  obraSocial.porcentaje_descuento *
  medico.valor_consulta / 100
 );


}




// 5) crear turno

return await crearTurno({

 id_medico:
 medico.id_medico,


 id_paciente:
 paciente.id_paciente,


 id_obra_social:
 obraSocial.id_obra_social,


 fecha_hora,


 valor_total:
 valorTotal


});


}

