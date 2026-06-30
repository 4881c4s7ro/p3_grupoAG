import { Router } from 'express';
import * as turnosController from '../controllers/turnos_reservas.controller.js';
import { verificarToken, permitirRoles } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/paciente',turnosController.listarTurnosPaciente);
router.post('/medico',turnosController.listarTurnosMedico);
router.post('/reservar',turnosController.reservarPacienteTurno);

export default router;