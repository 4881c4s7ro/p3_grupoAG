import jwt from 'jsonwebtoken';

// 1. Verificar si el usuario está autenticado mediante un Token válido
export const verificarToken = (req, res, next) => {
    // Los tokens se suelen enviar en el header 'Authorization' con el formato: Bearer TOKEN
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'Acceso denegado. No se proporcionó un token de autenticación.'
        });
    }

    try {
        // Verificamos el token con la clave secreta de tu archivo .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'firma_secreta_de_emergencia');
        
        // Guardamos los datos decodificados (id_usuario y rol) dentro del objeto request (req)
        // para que cualquier controlador posterior pueda saber quién está operando
        req.usuario = decoded;
        
        next(); // Continuamos al siguiente paso
    } catch (error) {
        return res.status(403).json({
            ok: false,
            message: 'Token inválido o expirado.'
        });
    }
};

// 2. Controlar la autorización basada en roles (Médico=1, Paciente=2, Administrador=3)
export const permitirRoles = (...rolesPermitidos) => {
    return (req, res, next) => {
        // Recordá que req.usuario fue cargado previamente por el middleware 'verificarToken'
        if (!req.usuario) {
            return res.status(500).json({
                ok: false,
                message: 'Error de configuración en el servidor de autenticación.'
            });
        }

        // Verificamos si el rol del usuario está incluido en los roles permitidos para esta ruta
        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({
                ok: false,
                message: 'No tenés los permisos necesarios para acceder a este recurso.'
            });
        }

        next();
    };
};