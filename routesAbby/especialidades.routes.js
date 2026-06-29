import { Router } from 'express';
import * as especialidadesController from '../controllers/especialidades.controller.js';
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
    especialidadesController.getAll
);

/**
 * @swagger
 * /api/v1/especialidades/{id}:
 *   get:
 *     summary: Obtener una especialidad por ID
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
 *     responses:
 *       200:
 *         description: Especialidad encontrada
 *       404:
 *         description: Especialidad no encontrada
 */
router.get(
    '/:id',
    [verificarToken, permitirRoles(2, 3)],
    especialidadesController.getById
);

/**
 * @swagger
 * /api/v1/especialidades:
 *   post:
 *     summary: Crear una especialidad
 *     tags:
 *       - Especialidades
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Cardiología
 *     responses:
 *       201:
 *         description: Especialidad creada
 */
router.post(
    '/',
    [verificarToken, permitirRoles(3)],
    especialidadesController.create
);

/**
 * @swagger
 * /api/v1/especialidades/{id}:
 *   put:
 *     summary: Actualizar una especialidad
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Cardiología Infantil
 *     responses:
 *       200:
 *         description: Especialidad actualizada
 *       404:
 *         description: Especialidad no encontrada
 */
router.put(
    '/:id',
    [verificarToken, permitirRoles(3)],
    especialidadesController.update
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
 *     responses:
 *       200:
 *         description: Especialidad eliminada correctamente
 *       404:
 *         description: Especialidad no encontrada
 */
router.delete(
    '/:id',
    [verificarToken, permitirRoles(3)],
    especialidadesController.remove
);

export default router;