const fs = require("fs");

// Funciones sincrónicas:

// Punto 1D (Crea un archivo para guardar los datos en mi compu)
function guardarEnArchivo(data) {
    fs.writeFileSync("personajes.json", JSON.stringify(data,null, 2));
    console.log("Archivos guardados Correctamente en personajes.json");
}

// Necesario para Punto 2. 
function leerArchivo() {
    const data = fs.readFileSync("personajes.json");
    return JSON.parse(data);
}

// Punto 2A
function agregarPersonajeAlFinal() {
    const personajes = leerArchivo();

    const nuevo = {
        id: 54,
        firstName: "Federico",
        lastname: "Jardín",
        fullName: "Federico Jardín",
        title: "Programador",
        family: "Jardín",

    };

    personajes.push(nuevo);

    fs.writeFileSync("personajes.json", JSON.stringify(personajes, null, 2));

    console.log("Personaje Agregado Al Final");
}

// Punto 2B

function agregarAlInicio() {
    const personajes = leerArchivo();

    const personaje1 = {
        id: 55,
        firstName: "Damián",
        lastName: "Engel",
        fullName: "Damián Engel",
        title: "Programador",
        family: "Engel",
    }

    const personaje2 = {
        id: 56,
        firstName: "Cristian",
        lastName: "Engel",
        fullName: "Cristian Engel",
        title: "Programador",
        family: "Engel",
    }

    personajes.unshift(personaje1, personaje2);

    fs.writeFileSync("personajes.json", JSON.stringify(personajes, null, 2));
    
    console.log("Dos Personajes Agregados al Inicio");

}


// 2C

function eliminarPrimerPersonaje() {
    const personajes = leerArchivo();
    
    const eliminado = personajes.shift();

    console.log("Primer Personaje Eliminado", eliminado);

    fs.writeFileSync("personajes.json", JSON.stringify(personajes, null, 2));

}

// Punto 2D

function crearNuevoArchivoReducido() {
    const personajes = leerArchivo();
    
    const reducido = personajes.map(p => ({
        id: p.id,
        nombre: p.fullName,
    }))

    fs.writeFileSync("personajes_reducido.json", JSON.stringify(reducido, null, 2));

    console.log("Archivo Reducido Creado Correctamente");
}

// Punto 2E

function ordenarPorNombreDescendentemente() {
    const data = fs.readFileSync("personajes_reducido.json");
    const personajes = JSON.parse(data);

    personajes.sort((a, b) => b.nombre.localeCompare(a.nombre));

    console.log("Personajes Ordenados Decrecientemente", personajes);

}

// Funciones asincrónicas:

// Punto 1A
async function obtenerPersonajes() {
    try {
        const res = await fetch("https://thronesapi.com/api/v2/Characters");
        const data = await res.json();

        console.log("Personajes Obtenidos", data.length);
        return data;
    }   
    catch (error) { console.error("Error al Obtener Los Personajes:", error);
    }
}

// Punto 1B
async function agregarPersonaje() {
    try {
        const nuevo = {
            firstName: "Federico Jardín",
            title: "El Más Capito",
            family: "Jardín",
        };

        const res = await fetch("https://thronesapi.com/api/v2/Characters", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(nuevo)
        });

        const data = await res.json();
        console.log("Respuesta POST:", data);
    }
    catch (error) {
        console.log("Error al hacer POST", error);
    }
    
}

// Punto 1C
async function obtenerPersonajePorId(id) {
    try {
        const res = await fetch(`https://thronesapi.com/api/v2/Characters/${id}`);
        const data = await res.json();

        console.log("Personajes Obtenidos", data);
        return data;

    }
    catch (error) {
        console.error("Error al encontrar Personaje", error);
    }

}

// Punto 1D
async function guardarPersonajes() {
    try {
        const personajes = await obtenerPersonajes();
        guardarEnArchivo(personajes);
    }
    catch (error) {
        console.log("Error:", error);
    }
   
}




// Hola Profe. Probé Todas las Funciones y las deje listas para que Prueben.
