import * as authRepository from '../repositories/auth.repository.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const login = async (email, contrasenia) => {

    const usuario = await authRepository.getUserByEmail(email);

    if (!usuario) {
        throw new Error('Credenciales inválidas');
    }

    const hash = crypto
        .createHash('sha256')
        .update(contrasenia)
        .digest('hex');

    if (hash.toLowerCase() !== usuario.contrasenia.trim().toLowerCase()) {
        throw new Error('Credenciales inválidas');
    }

    const payload = {
        id_usuario: usuario.id_usuario,
        rol: usuario.rol
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: '2h'
        }
    );

    return {

        token,

        usuario: {
            id_usuario: usuario.id_usuario,
            documento: usuario.documento,
            apellido: usuario.apellido,
            nombres: usuario.nombres,
            email: usuario.email,
            foto_path: usuario.foto_path,
            rol: usuario.rol
        }
    };
};