import { Router } from 'express';
import * as turnosController from '../controllers/turnos_reservas.controller.js';
import { verificarToken, permitirRoles } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/paciente',turnosController.listarTurnosPaciente);

export default router;