// --- app.js ---
// Inicializamos los datos de médicos en el LocalStorage si no existen
const KEY = "medicos";

const medicosIniciales = [
  { id: 1, nombre: "Dr. Juan Pérez", especialidad: "Cardiología" },
  { id: 2, nombre: "Dra. Ana López", especialidad: "Pediatría" },
];

if (!localStorage.getItem(KEY)) {
  localStorage.setItem(KEY, JSON.stringify(medicosIniciales));
}

// Función para obtener la lista actual de médicos
function obtenerMedicos() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

// Función para guardar la lista actualizada
function guardarMedicos(lista) {
  localStorage.setItem(KEY, JSON.stringify(lista));
}

// Función para mostrar los médicos en una tabla
function mostrarMedicos() {
  const tabla = document.getElementById("tabla-medicos");
  const medicos = obtenerMedicos();

  tabla.innerHTML = medicos
    .map(
      (m) => `
      <tr>
        <td>${m.id}</td>
        <td>${m.nombre}</td>
        <td>${m.especialidad}</td>
        <td><button onclick="eliminarMedico(${m.id})">Eliminar</button></td>
      </tr>
    `
    )
    .join("");
}

// Función para agregar un médico nuevo
function agregarMedico(nombre, especialidad) {
  const medicos = obtenerMedicos();
  const nuevo = {
    id: medicos.length ? medicos[medicos.length - 1].id + 1 : 1,
    nombre,
    especialidad,
  };
  medicos.push(nuevo);
  guardarMedicos(medicos);
  mostrarMedicos();
}

// Función para eliminar un médico por id
function eliminarMedico(id) {
  const medicos = obtenerMedicos().filter((m) => m.id !== id);
  guardarMedicos(medicos);
  mostrarMedicos();
}

// Inicializa la tabla al cargar la página
document.addEventListener("DOMContentLoaded", mostrarMedicos);