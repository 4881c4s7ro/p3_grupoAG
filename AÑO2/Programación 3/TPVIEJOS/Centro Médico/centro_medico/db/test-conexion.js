import { pool } from './conexion.js';

export async function testConexion() {
    try {
        const con = await pool.getConnection();
        console.log("Conexión con base de datos OK");

        const [resulst] = await con.query("SELECT NOW() AS hora_servidor, DATABASE() AS base_datos");
        console.log("Datos de prueba");    
        console.table(resulst);

        con.release();
    } catch (error) {
        console.log("Error al conectarse a la base de datos", error);
        console.error({
            codigo: error.code,
            msg: error.message
        });
        process.exit(1);
    }
}