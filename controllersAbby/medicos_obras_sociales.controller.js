import * as medicosObrasSocialesService
    from '../services/medicos_obras_sociales.service.js';


//---------------------------------------------------------
// Administrador - Asociar médico con obra social
//---------------------------------------------------------
export const asociarMedicoObraSocial = async (req, res) => {

    try {

        const resultado =
            await medicosObrasSocialesService.asociarMedicoObraSocial(
                req.body
            );

        res.status(200).json(resultado);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

};