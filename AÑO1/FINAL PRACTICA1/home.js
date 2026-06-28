document.addEventListener("DOMContentLoaded", () => {
    const usuario = localStorage.getItem("usuario");
    const imagen = document.getElementById("imagen-messi");

    if (usuario) {
        imagen.classList.remove("oculto");
    }
});