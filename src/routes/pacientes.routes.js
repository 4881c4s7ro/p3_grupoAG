import { Router } from 'express';
import * as controller from '../controllers/pacientes.controller.js';
import {
    verificarToken,
    permitirRoles
} from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/v1/pacientes:
 *   get:
 *     summary: Obtener todos los pacientes
 *     tags:
 *       - Pacientes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pacientes
 */
router.get(
    '/',
    [verificarToken, permitirRoles(3)],
    controller.getAll
);

/**
 * @swagger
 * /api/v1/pacientes/{id}:
 *   get:
 *     summary: Obtener un paciente por ID
 *     tags:
 *       - Pacientes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *       403:
 *         description: No autorizado para consultar este paciente
 *       404:
 *         description: Paciente no encontrado
 */
router.get(
    '/:id',
    [verificarToken, permitirRoles(2, 3)],
    controller.getById
);

/**
 * @swagger
 * /api/v1/pacientes/usuario/{idUsuario}:
 *   get:
 *     summary: Obtener paciente por usuario
 *     tags:
 *       - Pacientes
 *     security:
 *       - bearerAuth: []
 */
router.get(
    '/usuario/:idUsuario',
    [verificarToken, permitirRoles(3)],
    controller.getByUsuario
);

/**
 * @swagger
 * /api/v1/pacientes/obra-social/{idObraSocial}:
 *   get:
 *     summary: Obtener pacientes por obra social
 *     tags:
 *       - Pacientes
 *     security:
 *       - bearerAuth: []
 */
router.get(
    '/obra-social/:idObraSocial',
    [verificarToken, permitirRoles(3)],
    controller.getByObraSocial
);

/**
 * @swagger
 * /api/v1/pacientes:
 *   post:
 *     summary: Crear un paciente
 *     tags:
 *       - Pacientes
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
 * /api/v1/pacientes/{id}:
 *   put:
 *     summary: Actualizar un paciente
 *     tags:
 *       - Pacientes
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
 * /api/v1/pacientes/{id}:
 *   delete:
 *     summary: Eliminar un paciente
 *     tags:
 *       - Pacientes
 *     security:
 *       - bearerAuth: []
 */
router.delete(
    '/:id',
    [verificarToken, permitirRoles(3)],
    controller.remove
);

export default router;