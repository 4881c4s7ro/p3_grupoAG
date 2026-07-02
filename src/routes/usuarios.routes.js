import { Router } from 'express';
import * as controller from '../controllers/usuarios.controller.js';
import {
    verificarToken,
    permitirRoles
} from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/v1/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get(
    '/',
    [verificarToken, permitirRoles(3)],
    controller.getAll
);

/**
 * @swagger
 * /api/v1/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 */
router.get(
    '/:id',
    [verificarToken, permitirRoles(3)],
    controller.getById
);

/**
 * @swagger
 * /api/v1/usuarios:
 *   post:
 *     summary: Crear un usuario
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 */
router.post(
    '/',
    [verificarToken, permitirRoles(3)],
    controller.create
);

/**
 * @swagger
 * /api/v1/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 */
router.put(
    '/:id',
    [verificarToken, permitirRoles(3)],
    controller.update
);

/**
 * @swagger
 * /api/v1/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 */
router.delete(
    '/:id',
    [verificarToken, permitirRoles(3)],
    controller.remove
);

export default router;