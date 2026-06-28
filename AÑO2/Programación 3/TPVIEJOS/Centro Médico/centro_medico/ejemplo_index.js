import express from "express";
import { pool } from "./db/conexion.js";
import { testConexion } from "./db/test-conexion.js"

import { check } from 'express-validator';
import { param } from "express-validator";
import { validarCampos } from "./middlewares/validarCampos.js";


const app = express();

await testConexion();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({'estado': true, 'msg': 'API OK'});
})

app.post('/especialidades', 
    [
        check('nombre', 'El nombre es obligatorio.').notEmpty(),
        validarCampos
    ], 
    async (req, res) => {
    try {
        const { nombre } = req.body;

        const sql = 'INSERT INTO especialidades (nombre) VALUES (?)';

        const [result] = await pool.execute(sql, [nombre]);

        if (result.affectedRows > 0){
            res.status(201).send({'estado': true, 'msg': `ID Creado ${result.insertId}`});
        }

    }catch( error ){
        res.status(500).send({'estado':false, 'msg': 'Error interno.'});
    } 
});

app.put('/especialidades/:id_especialidad', 
    [
        check('nombre')
            .notEmpty().withMessage('El nombre es obligatorio.')
            .isLength({max:120}).withMessage('El nombre no debe ser mayor a 120 caracteres.'),
        param('id_especialidad', 'El parámetro debe ser entero').isInt(),    
        validarCampos
    ], 
    async (req, res) => {
    try {

        const id_especialidad = req.params.id_especialidad;
        const sqlb = `SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?`;

        const [especialidades, fields] = await pool.execute(sqlb, [id_especialidad]);

        if (especialidades.length === 0){
            return res.status(404).send({'estado': false, 'msg': 'Especialidad no encontrada'});
        }

        const { nombre } = req.body;
        
        const sql = 'UPDATE especialidades SET nombre = ? WHERE id_especialidad = ?';

        const [result] = await pool.execute(sql, [nombre, id_especialidad]);

        if (result.affectedRows > 0){
            res.status(200).send({'estado': true, 'msg': 'Especialidad modificada'});
        }

    }catch( error ){
        console.log(error);
        res.status(500).send({'estado':false, 'msg': 'Error interno.'});
    } 
})


app.delete('/especialidades/:id_especialidad', 
    [
        param('id_especialidad', 'El parámetro debe ser entero').isInt(),    
        validarCampos
    ], 
    async (req, res) => {
    try {

        const id_especialidad = req.params.id_especialidad;
        const sqlb = `SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?`;

        const [especialidades, fields] = await pool.execute(sqlb, [id_especialidad]);

        if (especialidades.length === 0){
            return res.status(404).send({'estado': false, 'msg': 'Especialidad no encontrada'});
        }

        const sql = 'UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?';

        const [result] = await pool.execute(sql, [id_especialidad]);

        if (result.affectedRows > 0){
            res.status(200).send({'estado': true, 'msg': 'Especialidad eliminada.'});
        }


    }catch( error ){
        console.log(error);
        res.status(500).send({'estado':false, 'msg': 'Error interno.'});
    } 
})

app.get('/especialidades', async (req, res) => {

    try{
        const sql = "SELECT * FROM especialidades WHERE activo = 1";        
        const [especialidades, fields] = await pool.query(sql);

        console.log(fields); // METADATOS DE LA BASE DE DATOS

        res.status(200).send(
            {
                'estado': true, 
                'especialidades': especialidades
            }
        );

    }catch(error) {
        console.log(error);
    }
});

app.get('/especialidades/:id_especialidades', async (req, res) => {

    try{
        const id_especialidad = req.params.id_especialidades;
        const sql = `SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?`;

        const [especialidades, fields] = await pool.execute(sql, [id_especialidad]);

        res.status(200).send(
            {
                'estado': true,
                'especialidades': especialidades
            }
        );

    }catch(error) {
        console.log(error);
    }

})

process.loadEnvFile();
const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
    console.log(`servidor iniciado OK en puerto ${PUERTO}`);
})