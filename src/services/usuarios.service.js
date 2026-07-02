import * as usuariosRepository from '../repositories/usuarios.repository.js';
import crypto from 'crypto';


// Obtener todos los usuarios
export const getAll = async () => {

    return await usuariosRepository.getAll();

};


// Obtener usuario por ID
export const getById = async (id_usuario) => {

    const usuario = await usuariosRepository.getById(id_usuario);

    if (!usuario) {
        throw new Error('Usuario no encontrado.');
    }

    return usuario;

};


// Crear usuario
export const create = async (usuario) => {

    // Encriptar contraseña con SHA-256
    const hash = crypto
        .createHash('sha256')
        .update(usuario.contrasenia)
        .digest('hex');

    usuario.contrasenia = hash;

    const id = await usuariosRepository.create(usuario);

    return await usuariosRepository.getById(id);

};


// Actualizar usuario
export const update = async (id_usuario, usuario) => {

    // Si llega una contraseña nueva, la volvemos a hashear
    if (usuario.contrasenia) {

        usuario.contrasenia = crypto
            .createHash('sha256')
            .update(usuario.contrasenia)
            .digest('hex');

    }

    const filas = await usuariosRepository.update(
        id_usuario,
        usuario
    );

    if (filas === 0) {
        throw new Error('Usuario no encontrado.');
    }

    return await usuariosRepository.getById(id_usuario);

};


// Eliminación lógica
export const remove = async (id_usuario) => {

    const filas = await usuariosRepository.remove(id_usuario);

    if (filas === 0) {
        throw new Error('Usuario no encontrado.');
    }

    return true;

};