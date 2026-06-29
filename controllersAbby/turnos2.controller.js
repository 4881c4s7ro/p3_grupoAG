
import {
 listarReservasPaciente
} from "../services/turnos.service.js";

import {

obtenerPaciente,
obtenerMedicoPorEspecialidad,
obtenerObraSocial,
crearTurno

} from "../repositories/turnos_reservas.repository.js";


export const atenderTurno = async(req,res)=>{


try{


const resultado =
await atenderTurnoService(req.body);


res.json(resultado);


}catch(error){


res.status(400).json({
 mensaje:error.message
});


}


};



export const listarMisTurnos = async(req,res)=>{


try{


const turnos =
await listarReservasPaciente(req.body);



res.json(turnos);



}catch(error){


res.status(400).json({
 mensaje:error.message
});


}


};

export const reservarTurno = async(req,res)=>{


try{


const id =
await reservarTurnoService(req.body);



res.json({

mensaje:"Turno reservado",
id_turno:id

});


}catch(error){


res.status(400).json({

mensaje:error.message

});


}


}

