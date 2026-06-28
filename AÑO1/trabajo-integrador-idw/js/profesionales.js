import { inicializarLocalStorage, obtenerMedicos } from './medicos-service.js';

inicializarLocalStorage();

document.addEventListener('DOMContentLoaded', function() {
    cargarMedicos();
});

function cargarMedicos() {
    const medicos = obtenerMedicos();
    const contenedorMedicos = document.getElementById('contenedorMedicos');
    const contenedorModales = document.getElementById('contenedorModales');
    
    if (medicos.length === 0) {
        contenedorMedicos.innerHTML = '<div class="col-12"><p class="text-center">No hay profesionales disponibles en este momento.</p></div>';
        return;
    }
    
    contenedorMedicos.innerHTML = medicos.map(medico => {
        const modalId = `modal${medico.id}`;
        return `
            <div class="col-12 col-md-6 mb-4">
                <div class="card">
                    <img src="${medico.imagen}" class="card-img-top" alt="${medico.nombre} ${medico.apellido}">
                    <div class="card-body">
                        <h5 class="card-title">${medico.nombre} ${medico.apellido}</h5>
                        <p class="card-text">${medico.especialidad}</p>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modalId}">
                            Más información
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    contenedorModales.innerHTML = medicos.map(medico => {
        const modalId = `modal${medico.id}`;
        const modalBodyId = `modalBody${medico.id}`;
        const modalLabel = `modalLabel${medico.id}`;
        
        return `
            <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalLabel}" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="${modalLabel}">${medico.nombre} ${medico.apellido}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" id="${modalBodyId}">
                            <p><strong>Especialidad:</strong> ${medico.especialidad}</p>
                            <p><strong>Matrícula:</strong> ${medico.matricula}</p>
                            <p><strong>Experiencia:</strong> ${medico.experiencia}</p>
                            <p><strong>Teléfono:</strong> ${medico.telefono}</p>
                            <p><strong>Email:</strong> ${medico.email}</p>
                            <hr>
                            <p>${medico.descripcion}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" onclick="solicitarProfesional('${modalBodyId}', '${medico.nombre} ${medico.apellido}')">Solicitar profesional</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

window.solicitarProfesional = function(modalBodyId, profesionalNombre) {
    const modalBody = document.getElementById(modalBodyId);
    
    modalBody.innerHTML = `
        <div class="alert alert-success" role="alert">
            ¡Profesional solicitado! Se ha enviado la solicitud para ${profesionalNombre}.
        </div>
    `;
    
    const button = modalBody.closest('.modal-content').querySelector('.btn-primary');
    button.disabled = true;
};
