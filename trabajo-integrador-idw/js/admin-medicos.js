import { 
    inicializarLocalStorage, 
    obtenerMedicos, 
    obtenerMedicoPorId, 
    crearMedico, 
    actualizarMedico, 
    eliminarMedico 
} from './medicos-service.js';

inicializarLocalStorage();

let modalVerMedico;
let modalFormularioMedico;
let modalEliminarMedico;
let medicoIdParaEliminar = null;

document.addEventListener('DOMContentLoaded', function() {
    modalVerMedico = new bootstrap.Modal(document.getElementById('modalVerMedico'));
    modalFormularioMedico = new bootstrap.Modal(document.getElementById('modalFormularioMedico'));
    modalEliminarMedico = new bootstrap.Modal(document.getElementById('modalEliminarMedico'));
    
    cargarTablaMedicos();
    
    document.getElementById('btnConfirmarEliminar').addEventListener('click', confirmarEliminacion);
});

function cargarTablaMedicos() {
    const medicos = obtenerMedicos();
    const tbody = document.getElementById('tablaMedicos');
    
    if (medicos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center">No hay médicos registrados</td></tr>';
        return;
    }
    
    tbody.innerHTML = medicos.map(medico => `
        <tr>
            <td>${medico.id}</td>
            <td>${medico.nombre}</td>
            <td>${medico.apellido}</td>
            <td>${medico.especialidad}</td>
            <td>${medico.matricula}</td>
            <td>${medico.telefono}</td>
            <td>${medico.email}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="verDetallesMedico(${medico.id})" title="Ver detalles">
                    👁️
                </button>
                <button class="btn btn-sm btn-warning" onclick="prepararEditarMedico(${medico.id})" title="Editar">
                    ✏️
                </button>
                <button class="btn btn-sm btn-danger" onclick="prepararEliminarMedico(${medico.id})" title="Eliminar">
                    🗑️
                </button>
            </td>
        </tr>
    `).join('');
}

window.verDetallesMedico = function(id) {
    const medico = obtenerMedicoPorId(id);
    if (!medico) return;
    
    const modalBody = document.getElementById('modalVerMedicoBody');
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-4 text-center mb-3">
                <img src="${medico.imagen}" class="img-fluid rounded" alt="${medico.nombre} ${medico.apellido}">
            </div>
            <div class="col-md-8">
                <p><strong>ID:</strong> ${medico.id}</p>
                <p><strong>Nombre Completo:</strong> ${medico.nombre} ${medico.apellido}</p>
                <p><strong>Especialidad:</strong> ${medico.especialidad}</p>
                <p><strong>Matrícula:</strong> ${medico.matricula}</p>
                <p><strong>Teléfono:</strong> ${medico.telefono}</p>
                <p><strong>Email:</strong> ${medico.email}</p>
                <p><strong>Experiencia:</strong> ${medico.experiencia}</p>
                <p><strong>Descripción:</strong> ${medico.descripcion}</p>
            </div>
        </div>
    `;
    
    modalVerMedico.show();
};

window.prepararCrearMedico = function() {
    document.getElementById('modalFormularioMedicoLabel').textContent = 'Nuevo Médico';
    document.getElementById('formularioMedico').reset();
    document.getElementById('medicoId').value = '';
};

window.prepararEditarMedico = function(id) {
    const medico = obtenerMedicoPorId(id);
    if (!medico) return;
    
    document.getElementById('modalFormularioMedicoLabel').textContent = 'Editar Médico';
    document.getElementById('medicoId').value = medico.id;
    document.getElementById('medicoNombre').value = medico.nombre;
    document.getElementById('medicoApellido').value = medico.apellido;
    document.getElementById('medicoEspecialidad').value = medico.especialidad;
    document.getElementById('medicoMatricula').value = medico.matricula;
    document.getElementById('medicoTelefono').value = medico.telefono;
    document.getElementById('medicoEmail').value = medico.email;
    document.getElementById('medicoExperiencia').value = medico.experiencia;
    document.getElementById('medicoDescripcion').value = medico.descripcion;
    document.getElementById('medicoImagen').value = medico.imagen;
    
    modalFormularioMedico.show();
};

window.guardarMedico = function() {
    const form = document.getElementById('formularioMedico');
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const medicoId = document.getElementById('medicoId').value;
    const imagenValue = document.getElementById('medicoImagen').value;
    const medicoData = {
        nombre: document.getElementById('medicoNombre').value,
        apellido: document.getElementById('medicoApellido').value,
        especialidad: document.getElementById('medicoEspecialidad').value,
        matricula: document.getElementById('medicoMatricula').value,
        telefono: document.getElementById('medicoTelefono').value,
        email: document.getElementById('medicoEmail').value,
        experiencia: document.getElementById('medicoExperiencia').value,
        descripcion: document.getElementById('medicoDescripcion').value,
        imagen: imagenValue || '../assets/img-medicos/confident-successful-mature-doctor-at-hospital.webp'
    };
    
    let mensaje;
    if (medicoId) {
        actualizarMedico(medicoId, medicoData);
        mensaje = 'Médico actualizado correctamente';
    } else {
        crearMedico(medicoData);
        mensaje = 'Médico creado correctamente';
    }
    
    cargarTablaMedicos();
    
    modalFormularioMedico.hide();
    
    mostrarMensaje(mensaje, 'success');
};

window.prepararEliminarMedico = function(id) {
    medicoIdParaEliminar = id;
    modalEliminarMedico.show();
};

function confirmarEliminacion() {
    if (medicoIdParaEliminar) {
        eliminarMedico(medicoIdParaEliminar);
        cargarTablaMedicos();
        modalEliminarMedico.hide();
        mostrarMensaje('Médico eliminado correctamente', 'success');
        medicoIdParaEliminar = null;
    }
}

function mostrarMensaje(mensaje, tipo) {
    if (!tipo) {
        tipo = 'info';
    }
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${tipo} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}
