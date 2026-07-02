import { Router } from 'express';
import * as controller from '../controllers/medicos.controller.js';
import {
    verificarToken,
    permitirRoles
} from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/v1/medicos:
 *   get:
 *     summary: Obtener todos los médicos
 *     tags:
 *       - Médicos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de médicos
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
 * /api/v1/medicos/{id}:
 *   get:
 *     summary: Obtener un médico por ID
 *     tags:
 *       - Médicos
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
 *         description: Médico encontrado
 *       404:
 *         description: Médico no encontrado
 */
router.get(
    '/:id',
    [verificarToken, permitirRoles(2, 3)],
    controller.getById
);

/**
 * @swagger
 * /api/v1/medicos/especialidad/{idEspecialidad}:
 *   get:
 *     summary: Obtener médicos por especialidad
 *     tags:
 *       - Médicos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idEspecialidad
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de médicos
 *       404:
 *         description: Especialidad no encontrada
 */
router.get(
    '/especialidad/:idEspecialidad',
    [verificarToken, permitirRoles(2, 3)],
    controller.getByEspecialidad
);

/**
 * @swagger
 * /api/v1/medicos:
 *   post:
 *     summary: Crear un médico
 *     tags:
 *       - Médicos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_usuario
 *               - id_especialidad
 *               - matricula
 *               - descripcion
 *               - valor_consulta
 *             properties:
 *               id_usuario:
 *                 type: integer
 *               id_especialidad:
 *                 type: integer
 *               matricula:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               valor_consulta:
 *                 type: number
 *     responses:
 *       201:
 *         description: Médico creado correctamente
 */
router.post(
    '/',
    [verificarToken, permitirRoles(3)],
    controller.create
);

/**
 * @swagger
 * /api/v1/medicos/{id}:
 *   put:
 *     summary: Actualizar un médico
 *     tags:
 *       - Médicos
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
 *     responses:
 *       200:
 *         description: Médico actualizado correctamente
 */
router.put(
    '/:id',
    [verificarToken, permitirRoles(3)],
    controller.update
);

/**
 * @swagger
 * /api/v1/medicos/{id}/especialidad:
 *   put:
 *     summary: Asociar una especialidad a un médico
 *     tags:
 *       - Médicos
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
 *               - id_especialidad
 *             properties:
 *               id_especialidad:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Especialidad asociada correctamente
 *       404:
 *         description: Médico o especialidad inexistente
 */
router.put(
    '/:id/especialidad',
    [verificarToken, permitirRoles(3)],
    controller.asociarEspecialidad
);

/**
 * @swagger
 * /api/v1/medicos/{id}:
 *   delete:
 *     summary: Eliminar un médico
 *     tags:
 *       - Médicos
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
 *         description: Médico eliminado correctamente
 *       404:
 *         description: Médico no encontrado
 */
router.delete(
    '/:id',
    [verificarToken, permitirRoles(3)],
    controller.remove
);

export default router;