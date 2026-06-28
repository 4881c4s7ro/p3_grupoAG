import { Router } from 'express';
import * as turnosController from '../../controllers/turnos.controller.js';
import { verificarToken, permitirRoles } from '../../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/v1/turnos:
 *   post:
 *     summary: Registrar un nuevo turno
 *     tags:
 *       - Turnos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Turno registrado correctamente
 *       401:
 *         description: No autorizado
 */
router.post(
  '/',
  [verificarToken, permitirRoles(2, 3)],
  turnosController.registrarTurno
);

/**
 * @swagger
 * /api/v1/turnos/{id}/atender:
 *   put:
 *     summary: Atender un turno
 *     tags:
 *       - Turnos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno
 *     responses:
 *       200:
 *         description: Turno atendido correctamente
 *       404:
 *         description: Turno no encontrado
 */
router.put(
  '/:id/atender',
  [verificarToken, permitirRoles(1, 3)],
  turnosController.atenderTurno
);

/**
 * @swagger
 * /api/v1/turnos/reporte:
 *   get:
 *     summary: Obtiene el reporte mensual de turnos
 *     tags:
 *       - Turnos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reporte generado correctamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 */
router.get(
  '/reporte',
  [verificarToken, permitirRoles(3)],
  turnosController.obtenerReporteMensual
);

/**
 * @swagger
 * /api/v1/turnos/descargar-pdf:
 *   get:
 *     summary: Descargar reporte mensual en PDF
 *     tags:
 *       - Turnos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: PDF generado correctamente
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: No autorizado
 */
router.get(
  '/descargar-pdf',
  [verificarToken, permitirRoles(3)],
  turnosController.descargarReportePDF
);

export default router;