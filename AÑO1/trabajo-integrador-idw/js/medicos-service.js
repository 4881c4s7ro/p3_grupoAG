import { MEDICOS_INICIALES } from './data.js';

const STORAGE_KEY = 'medicos';

export function inicializarLocalStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(MEDICOS_INICIALES));
    }
}

export function obtenerMedicos() {
    const medicos = localStorage.getItem(STORAGE_KEY);
    if (medicos) {
        return JSON.parse(medicos);
    } else {
        return [];
    }
}

export function obtenerMedicoPorId(id) {
    const medicos = obtenerMedicos();
    return medicos.find(medico => medico.id === parseInt(id));
}

export function crearMedico(medico) {
    const medicos = obtenerMedicos();
    let nuevoId;
    if (medicos.length > 0) {
        nuevoId = Math.max(...medicos.map(m => m.id)) + 1;
    } else {
        nuevoId = 1;
    }
    const nuevoMedico = { ...medico, id: nuevoId };
    medicos.push(nuevoMedico);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(medicos));
    return nuevoMedico;
}

export function actualizarMedico(id, medicoActualizado) {
    const medicos = obtenerMedicos();
    const index = medicos.findIndex(medico => medico.id === parseInt(id));
    if (index !== -1) {
        medicos[index] = { ...medicoActualizado, id: parseInt(id) };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(medicos));
        return true;
    }
    return false;
}

export function eliminarMedico(id) {
    const medicos = obtenerMedicos();
    const medicosFiltrados = medicos.filter(medico => medico.id !== parseInt(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(medicosFiltrados));
    return medicosFiltrados.length < medicos.length;
}
