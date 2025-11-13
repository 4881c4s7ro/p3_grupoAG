// auth-guard.js - Protección de rutas de administración
(() => {
    /**
     * Verifica si el usuario está autenticado
     */
    function isAuthenticated() {
        const token = sessionStorage.getItem('accessToken');
        return !!token;
    }

    /**
     * Obtiene el usuario almacenado en sessionStorage
     */
    function getStoredUser() {
        try {
            return JSON.parse(sessionStorage.getItem('user') || 'null');
        } catch (e) {
            return null;
        }
    }

    /**
     * Protege la página actual - redirige al login si no está autenticado
     */
    function protectPage() {
        if (!isAuthenticated()) {
            alert('Acceso denegado. Debe iniciar sesión para acceder a esta página.');
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    /**
     * Cerrar sesión
     */
    function logout() {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('user');
        alert('Sesión cerrada correctamente.');
        window.location.href = 'login.html';
    }

    /**
     * Inicializar protección de página al cargar
     */
    document.addEventListener('DOMContentLoaded', () => {
        // Verificar si estamos en una página de administración
        const currentPage = window.location.pathname;
        const adminPages = ['admin-medicos.html', 'login.html'];
        
        // Solo proteger páginas de administración (excepto login)
        if (adminPages.some(page => currentPage.includes(page)) && !currentPage.includes('login.html')) {
            protectPage();
        }

        // Agregar funcionalidad de logout a botones con clase 'logout-btn'
        const logoutButtons = document.querySelectorAll('.logout-btn');
        logoutButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        });

        // Mostrar información del usuario si está logueado
        const userInfoElements = document.querySelectorAll('.user-info');
        if (isAuthenticated() && userInfoElements.length > 0) {
            const user = getStoredUser();
            const userName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Usuario';
            userInfoElements.forEach(el => {
                el.textContent = userName;
            });
        }
    });

    // Exponer funciones globalmente
    window.AuthGuard = {
        isAuthenticated,
        getStoredUser,
        protectPage,
        logout
    };
})();