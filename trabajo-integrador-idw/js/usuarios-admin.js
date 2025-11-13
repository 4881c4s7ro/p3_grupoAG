// usuarios-admin.js - Gestión de usuarios registrados en el panel de administración
(() => {
    const API_BASE = 'https://dummyjson.com';

    // Elementos del DOM
    let btnRefrescarUsuarios, loadingUsuarios, errorUsuarios, tablaUsuarios, tablaUsuariosContainer;

    document.addEventListener('DOMContentLoaded', initUsuariosAdmin);

    function initUsuariosAdmin() {
        // Cache de elementos
        btnRefrescarUsuarios = document.getElementById('btnRefrescarUsuarios');
        loadingUsuarios = document.getElementById('loadingUsuarios');
        errorUsuarios = document.getElementById('errorUsuarios');
        tablaUsuarios = document.getElementById('tablaUsuarios');
        tablaUsuariosContainer = document.getElementById('tablaUsuariosContainer');

        if (!btnRefrescarUsuarios) return; // No estamos en la página de admin

        // Event listeners
        btnRefrescarUsuarios.addEventListener('click', cargarUsuarios);

        // Cargar usuarios inicialmente cuando se activa la tab
        const usuariosTab = document.getElementById('nav-usuarios-tab');
        if (usuariosTab) {
            usuariosTab.addEventListener('shown.bs.tab', () => {
                if (!tablaUsuarios.hasChildNodes()) {
                    cargarUsuarios();
                }
            });
        }
    }

    /**
     * Obtiene headers de autenticación
     */
    function getAuthHeaders() {
        const token = sessionStorage.getItem('accessToken');
        return {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };
    }

    /**
     * Muestra el estado de carga
     */
    function mostrarCarga() {
        loadingUsuarios.classList.remove('d-none');
        errorUsuarios.classList.add('d-none');
        tablaUsuariosContainer.style.opacity = '0.5';
        btnRefrescarUsuarios.disabled = true;
    }

    /**
     * Oculta el estado de carga
     */
    function ocultarCarga() {
        loadingUsuarios.classList.add('d-none');
        tablaUsuariosContainer.style.opacity = '1';
        btnRefrescarUsuarios.disabled = false;
    }

    /**
     * Muestra un error
     */
    function mostrarError(mensaje) {
        errorUsuarios.textContent = mensaje;
        errorUsuarios.classList.remove('d-none');
    }

    /**
     * Carga la lista de usuarios desde la API
     */
    async function cargarUsuarios() {
        // Verificar autenticación
        if (!window.AuthGuard || !window.AuthGuard.isAuthenticated()) {
            mostrarError('Debe iniciar sesión para ver los usuarios registrados.');
            return;
        }

        mostrarCarga();

        try {
            const response = await fetch(`${API_BASE}/users?limit=100`, {
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            renderizarUsuarios(data.users || []);
            
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
            mostrarError(`Error al cargar usuarios: ${error.message}`);
        } finally {
            ocultarCarga();
        }
    }

    /**
     * Renderiza la tabla de usuarios
     */
    function renderizarUsuarios(usuarios) {
        if (!Array.isArray(usuarios) || usuarios.length === 0) {
            tablaUsuarios.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center text-muted">
                        No se encontraron usuarios registrados.
                    </td>
                </tr>
            `;
            return;
        }

        const filas = usuarios.map(usuario => {
            const nombreCompleto = `${usuario.firstName || ''} ${usuario.lastName || ''}`.trim() || 'N/A';
            const edad = usuario.age || 'N/A';
            const genero = usuario.gender || 'N/A';
            
            return `
                <tr>
                    <td>${escapeHtml(usuario.id || 'N/A')}</td>
                    <td>${escapeHtml(nombreCompleto)}</td>
                    <td>${escapeHtml(usuario.username || 'N/A')}</td>
                    <td>${escapeHtml(usuario.email || 'N/A')}</td>
                    <td>${escapeHtml(usuario.phone || 'N/A')}</td>
                    <td>${escapeHtml(edad)}</td>
                    <td>${escapeHtml(genero)}</td>
                </tr>
            `;
        }).join('');

        tablaUsuarios.innerHTML = filas;
    }

    /**
     * Escapa HTML para prevenir XSS
     */
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        
        return String(text).replace(/[&<>"']/g, (match) => map[match]);
    }

    // Exponer funciones globalmente si es necesario
    window.UsuariosAdmin = {
        cargarUsuarios
    };

})();