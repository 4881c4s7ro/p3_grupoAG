const form = document.getElementById("form-login");
const mensaje = document.getElementById("mensaje");

// ============ 1. LOGIN CON API EXTERNA ===============
async function validarConAPI(email, pass) {
    try {
        // Cambiá esta URL por la real que te pidan en el final
        const response = await fetch("usuarios.json");
        const data = await response.json();

        // data es un array de usuarios, ejemplo:
        // [ { "email": "...", "password": "1234" }, ... ]
        const usuarioEncontrado = data.find(
            (user) => user.email === email && user.password === pass
        );

        return usuarioEncontrado !== undefined;
    } catch (error) {
        console.log("Error cargando API:", error);
        return false;
    }
}

// ===============================================

if (form) {
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const pass = document.getElementById("password").value;

        // 1️⃣ Primero intentamos verificar con la API
        const loginAPI = await validarConAPI(email, pass);

        // 2️⃣ Si la API lo valida → login OK
        if (loginAPI) {
            localStorage.setItem("usuario", email);

            mensaje.textContent = "Usuario Registrado Correctamente.";
            mensaje.style.color = "green";

            setTimeout(() => {
                window.location.href = "home.html";
            }, 1000);
            return;
        }

        // 3️⃣ Si la API falla → pasamos al usuario local viejo (por si lo querés conservar)
        const usuarioCorrecto = "damianengel1411@gmail.com";
        const passCorrecta = "1234";

        if (email === usuarioCorrecto && pass === passCorrecta) {

            localStorage.setItem("usuario", email);

            mensaje.textContent = "Usuario Registrado Correctamente.";
            mensaje.style.color = "green";

            setTimeout(() => {
                window.location.href = "home.html";
            }, 1000);
        } else {
            mensaje.textContent = "Email o Contraseña Incorrectos";
            mensaje.style.color = "red";
        }
    });
}


// ================= BOTÓN LOGIN/LOGOUT ==================

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    const usuario = localStorage.getItem("usuario");

    if (!loginBtn) return;

    if (usuario) {
        loginBtn.textContent = "Logout";
        loginBtn.href = "#";

        loginBtn.addEventListener("click", () => {
            localStorage.removeItem("usuario");
            window.location.href = "login.html";
        });
    }
});



