import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import * as authController from '../controllers/auth.controller.js';
import { uploadFoto } from '../middlewares/multer.middleware.js';

const router = Router();

const validarCampos = (req, res, next) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: err.array()
    });
  }

  next();
};

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               documento:
 *                 type: string
 *               apellido:
 *                 type: string
 *               nombres:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               contrasenia:
 *                 type: string
 *               rol:
 *                 type: integer
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error de validación
 */
router.post(
  '/register',
  uploadFoto,
  [
    body('documento').notEmpty(),
    body('apellido').notEmpty(),
    body('nombres').notEmpty(),
    body('email').isEmail(),
    body('contrasenia').isLength({ min: 6 }),
    body('rol').isNumeric(),
    validarCampos
  ],
  authController.registrarUsuario
);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - contrasenia
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               contrasenia:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('contrasenia').notEmpty(),
    validarCampos
  ],
  authController.login
);

export default router;