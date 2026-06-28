import jwt from 'jsonwebtoken';

export const registrarUsuario = async (req, res) => {
    try {
        const { documento, apellido, nombres, email, contrasenia, rol } = req.body;

        // Si se subió una foto la guardamos, sino usamos una por defecto
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
            rol: parseInt(rol),
            activo: 1
        };

        // Acá después iría la inserción en la base de datos

        return res.status(201).json({
            ok: true,
            message: 'Usuario registrado correctamente',
            data: nuevoUsuario
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error al registrar el usuario',
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email } = req.body;

        // Usuario de prueba hasta conectar la BD
        const usuarioEncontrado = {
            id_usuario: 8,
            email,
            rol: 3,
            apellido: 'Fernández',
            nombres: 'Benito'
        };

        const token = jwt.sign(
            {
                id_usuario: usuarioEncontrado.id_usuario,
                rol: usuarioEncontrado.rol
            },
            process.env.JWT_SECRET || 'firma_secreta_de_emergencia_prog3',
            { expiresIn: '2h' }
        );

        return res.status(200).json({
            ok: true,
            message: 'Login correcto',
            token,
            usuario: {
                id_usuario: usuarioEncontrado.id_usuario,
                nombre_completo: `${usuarioEncontrado.nombres} ${usuarioEncontrado.apellido}`,
                rol: usuarioEncontrado.rol
            }
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error al iniciar sesión',
            error: error.message
        });
    }
};