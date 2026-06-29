import * as usuariosService from '../services/usuarios.service.js';


//---------------------------------------------------------
// Iniciar sesión
//---------------------------------------------------------
export const login = async (req, res) => {

    try {

        const resultado =
            await usuariosService.login(
                req.body
            ); // no esta hecho

        res.status(200).json(resultado);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

};