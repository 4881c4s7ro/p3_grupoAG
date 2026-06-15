import { Router } from 'express';
import * as controller from '../controllers/especialidades.controller.js';
import { verificarToken, permitirRoles } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/v1/especialidades:
 *   get:
 *     summary: Obtener todas las especialidades
 *     tags:
 *       - Especialidades
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de especialidades
 *       401:
 *         description: No autorizado
 */
router.get(
  '/',
  [verificarToken, permitirRoles(2, 3)],
  controller.getAll
);

/**
 * @swagger
 * /api/v1/especialidades/{id}:
 *   delete:
 *     summary: Eliminar una especialidad
 *     tags:
 *       - Especialidades
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la especialidad
 *     responses:
 *       200:
 *         description: Especialidad eliminada correctamente
 *       404:
 *         description: Especialidad no encontrada
 */
router.delete(
  '/:id',
  [verificarToken, permitirRoles(3)],
  controller.remove
);

export default router;