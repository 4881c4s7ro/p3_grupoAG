import * as authService from '../services/auth.service.js';
import * as usuariosService from '../services/usuarios.service.js';


// ==============================
// Iniciar sesión
// ==============================
export const login = async (req, res) => {

    try {

        const { email, contrasenia } = req.body;

        const resultado = await authService.login(
            email,
            contrasenia
        );

        return res.status(200).json({
            ok: true,
            message: 'Login realizado correctamente.',
            ...resultado
        });

    } catch (error) {

        return res.status(401).json({
            ok: false,
            message: error.message
        });

    }

};


// ==============================
// Registrar usuario
// ==============================
export const registrarUsuario = async (req, res) => {

    try {

        const {
            documento,
            apellido,
            nombres,
            email,
            contrasenia,
            rol
        } = req.body;

        const foto_path = req.file
            ? `/uploads/${req.file.filename}`
            : '/uploads/default-avatar.png';

        const nuevoUsuario = {
            documento,
            apellido,
            nombres,
            email,
            contrasenia,
            foto_path,
            rol: parseInt(rol)
        };

        const usuario = await usuariosService.create(nuevoUsuario);

        return res.status(201).json({
            ok: true,
            message: 'Usuario registrado correctamente.',
            data: usuario
        });

    } catch (error) {

        return res.status(500).json({
            ok: false,
            message: error.message
        });

    }

};