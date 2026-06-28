import pool from '../config/db.js';


/* LISTAR TURNOS PROPIOS: dado un medico obtener todos sus turnos especificando apellido, nombre, documento,
 email del paciente, de las obras sociales que indique el nombre si es particular y si esta activo el 
 porcentaje de descuento, de los medicos que muestre el nombre, el apellido el email y la especialidad.

 */

export const obtenerTurnosPorMedico = async(id_medico)=>{

    const [rows] = await pool.query(`

    SELECT

        -- turno
        tr.id_turno_reserva,
        tr.fecha_hora,
        tr.valor_total,
        tr.atentido,


        -- paciente
        up.apellido AS apellido_paciente,
        up.nombres AS nombre_paciente,
        up.documento AS documento_paciente,
        up.email AS email_paciente,


        -- obra social
        os.nombre AS obra_social,
        os.es_particular,
        os.porcentaje_descuento,
        os.activo AS obra_social_activa,


        -- medico
        um.apellido AS apellido_medico,
        um.nombres AS nombre_medico,
        um.email AS email_medico,


        -- especialidad
        e.nombre AS especialidad


    FROM turnos_reservas tr


    INNER JOIN pacientes p
        ON tr.id_paciente = p.id_paciente


    INNER JOIN usuarios up
        ON p.id_usuario = up.id_usuario


    INNER JOIN obras_sociales os
        ON tr.id_obra_social = os.id_obra_social


    INNER JOIN medicos m
        ON tr.id_medico = m.id_medico


    INNER JOIN usuarios um
        ON m.id_usuario = um.id_usuario


    INNER JOIN especialidades e
        ON m.id_especialidad = e.id_especialidad


    WHERE 
        tr.id_medico = ?
        AND tr.activo = 1
        AND up.activo = 1
        AND um.activo = 1
        AND os.activo = 1
        AND e.activo = 1


    ORDER BY tr.fecha_hora ASC

    `,
    [id_medico]);


    return rows;

};

/* MARCAR UN TURNO COMO ATENDIDO: dado el dni de un medico y el dni de su paciente y dado una fecha y 
hora especifica de atencion modificar el turno del paciente con ese medico a atendido.   */ 

// Marca un turno como atendido
export const marcarTurnoAtendido = async(
    id_medico,
    id_paciente,
    fecha_hora
)=>{


    const [result] = await pool.query(`

        UPDATE turnos_reservas tr

        SET 
            tr.atentido = 1

        WHERE
            tr.id_medico = ?
            AND tr.id_paciente = ?
            AND tr.fecha_hora = ?
            AND tr.activo = 1

    `,
    [
        id_medico,
        id_paciente,
        fecha_hora
    ]);


    return result;

};


export const obtenerMedicoPorDocumento = async(dni)=>{


const [rows] = await pool.query(`

SELECT 
    m.id_medico

FROM medicos m

INNER JOIN usuarios u
ON m.id_usuario = u.id_usuario

WHERE
u.documento = ?
AND u.activo = 1

`,
[dni]);


return rows[0];

};

export const obtenerPacientePorDocumento = async(dni)=>{


const [rows] = await pool.query(`

SELECT 
    p.id_paciente

FROM pacientes p

INNER JOIN usuarios u
ON p.id_usuario = u.id_usuario

WHERE
u.documento = ?
AND u.activo = 1

`,
[dni]);


return rows[0];

}; 

/* teniendo en cuenta el acceso a los datos con el rol 2, es decir que un paciente pueda listar  sus  
RESERVAS ( TURNOS PROPIOS) : Dado el dni, nombre y apellido de un paciente, listar todos los turnos_reservas
 asociado a dicho paciente,   el nombre, apellido y especialidad del medico que lo atiende, si es particular 
 y si no es particular que muestre , el nombre de la obra social , el porcentaje de descuento que le 
 aplica la obra social, como asi tambien que muestre  la fecha y hora del turno y el valor total de la 
 consulta.
 */

// Obtener reservas propias de un paciente
export const obtenerReservasPaciente = async(
    dni,
    nombre,
    apellido
)=>{


const [rows] = await pool.query(`

SELECT

    -- turno
    tr.id_turno_reserva,
    tr.fecha_hora,
    tr.valor_total,
    tr.atentido,


    -- paciente
    up.documento AS dni_paciente,
    up.nombres AS nombre_paciente,
    up.apellido AS apellido_paciente,


    -- medico
    um.nombres AS nombre_medico,
    um.apellido AS apellido_medico,


    -- especialidad
    e.nombre AS especialidad,


    -- obra social
    os.nombre AS obra_social,
    os.es_particular,
    os.porcentaje_descuento


FROM turnos_reservas tr


INNER JOIN pacientes p
ON tr.id_paciente = p.id_paciente


INNER JOIN usuarios up
ON p.id_usuario = up.id_usuario



INNER JOIN medicos m
ON tr.id_medico = m.id_medico


INNER JOIN usuarios um
ON m.id_usuario = um.id_usuario



INNER JOIN especialidades e
ON m.id_especialidad = e.id_especialidad


INNER JOIN obras_sociales os
ON tr.id_obra_social = os.id_obra_social



WHERE

    up.documento = ?
    AND up.nombres = ?
    AND up.apellido = ?

    AND tr.activo = 1
    AND up.activo = 1
    AND um.activo = 1
    AND e.activo = 1
    AND os.activo = 1


ORDER BY tr.fecha_hora ASC


`,
[
 dni,
 nombre,
 apellido
]);


return rows;


};

/* CREAR RESERVAS (TURNOS PROPIOS): dado el nombre, apellido, documento de un paciente, el nombre de 
una especialida, asignarle un medico , y segun  la cobertura que tiene el paciente,  si es particular o  
si tiene obra social, asignarle a la reserva del turno el id_obra_social, como asi tembien la fecha y hora
 , valor total de la consulta . Como es un turno que todavia no fue atendido el atributo atendido debe ser 
 asignado a 0 y activo =1.   */

export const obtenerPaciente = async(
    documento,
    nombre,
    apellido
)=>{

const [rows] = await pool.query(`

SELECT
    p.id_paciente,
    p.id_obra_social

FROM pacientes p

INNER JOIN usuarios u
ON p.id_usuario = u.id_usuario

WHERE
u.documento = ?
AND u.nombres = ?
AND u.apellido = ?
AND u.activo = 1

`,
[
documento,
nombre,
apellido
]);


return rows[0];

};

export const obtenerMedicoPorEspecialidad = async(
    especialidad
)=>{


const [rows] = await pool.query(`


SELECT

m.id_medico,
m.valor_consulta


FROM medicos m


INNER JOIN especialidades e
ON m.id_especialidad = e.id_especialidad


WHERE

e.nombre = ?
AND e.activo = 1


LIMIT 1


`,
[especialidad]);


return rows[0];


};

export const obtenerObraSocial = async(id)=>{


const [rows] = await pool.query(`


SELECT *

FROM obras_sociales

WHERE

id_obra_social = ?
AND activo = 1


`,
[id]);


return rows[0];


};

export const crearTurno = async(datos)=>{


const [result] = await pool.query(`


INSERT INTO turnos_reservas
(
id_medico,
id_paciente,
id_obra_social,
fecha_hora,
valor_total,
atentido,
activo

)

VALUES
(?,?,?,?,?,?,?)


`,
[
datos.id_medico,
datos.id_paciente,
datos.id_obra_social,
datos.fecha_hora,
datos.valor_total,
0,
1
]);


return result.insertId;

}
