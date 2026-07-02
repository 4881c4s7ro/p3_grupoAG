import jwt from 'jsonwebtoken';

// Verificar que el usuario esté autenticado mediante un JWT válido
export const verificarToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'Acceso denegado. No se proporcionó un token de autenticación.'
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Guardamos los datos del usuario autenticado
        req.usuario = decoded;

        next();

    } catch (error) {

        return res.status(403).json({
            ok: false,
            message: 'Token inválido o expirado.'
        });

    }

};


// Control de autorización por roles
export const permitirRoles = (...rolesPermitidos) => {

    return (req, res, next) => {

        if (!req.usuario) {

            return res.status(500).json({
                ok: false,
                message: 'Error de autenticación.'
            });

        }

        if (!rolesPermitidos.includes(req.usuario.rol)) {

            return res.status(403).json({
                ok: false,
                message: 'No posee permisos para acceder a este recurso.'
            });

        }

        next();

    };

};