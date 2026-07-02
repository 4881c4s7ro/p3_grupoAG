import { Router } from 'express';
import * as controller from '../controllers/obras_sociales.controller.js';
import {
    verificarToken,
    permitirRoles
} from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/v1/obras-sociales:
 *   get:
 *     summary: Obtener todas las obras sociales
 *     tags:
 *       - Obras Sociales
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de obras sociales
 */
router.get(
    '/',
    [verificarToken, permitirRoles(2, 3)],
    controller.obtenerObrasSociales
);

/**
 * @swagger
 * /api/v1/obras-sociales/{id}:
 *   get:
 *     summary: Obtener una obra social por ID
 *     tags:
 *       - Obras Sociales
 *     security:
 *       - bearerAuth: []
 */
router.get(
    '/:id',
    [verificarToken, permitirRoles(2, 3)],
    controller.obtenerObraSocialPorId
);

/**
 * @swagger
 * /api/v1/obras-sociales:
 *   post:
 *     summary: Crear una obra social
 *     tags:
 *       - Obras Sociales
 *     security:
 *       - bearerAuth: []
 */
router.post(
    '/',
    [verificarToken, permitirRoles(3)],
    controller.crearObraSocial
);

/**
 * @swagger
 * /api/v1/obras-sociales/{id}:
 *   put:
 *     summary: Actualizar una obra social
 *     tags:
 *       - Obras Sociales
 *     security:
 *       - bearerAuth: []
 */
router.put(
    '/:id',
    [verificarToken, permitirRoles(3)],
    controller.editarObraSocial
);

/**
 * @swagger
 * /api/v1/obras-sociales/{id}:
 *   delete:
 *     summary: Eliminar una obra social
 *     tags:
 *       - Obras Sociales
 *     security:
 *       - bearerAuth: []
 */
router.delete(
    '/:id',
    [verificarToken, permitirRoles(3)],
    controller.remove
);

export default router;