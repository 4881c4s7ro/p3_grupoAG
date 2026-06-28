(() => {
    function isAuthenticated() {
        const token = sessionStorage.getItem('accessToken');
        return !!token;
    }
    function getStoredUser() {
        try {
            return JSON.parse(sessionStorage.getItem('user') || 'null');
        } catch (e) {
            return null;
        }
    }

    function protectPage() {
        if (!isAuthenticated()) {
            alert('Acceso denegado. Debe iniciar sesión para acceder a esta página.');
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    function logout() {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('user');
        alert('Sesión cerrada correctamente.');
        window.location.href = 'login.html';
    }

    document.addEventListener('DOMContentLoaded', () => {
        const currentPage = window.location.pathname;
        const adminPages = ['admin-medicos.html', 'login.html'];
        
        if (adminPages.some(page => currentPage.includes(page)) && !currentPage.includes('login.html')) {
            protectPage();
        }

        const logoutButtons = document.querySelectorAll('.logout-btn');
        logoutButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        });

        const userInfoElements = document.querySelectorAll('.user-info');
        if (isAuthenticated() && userInfoElements.length > 0) {
            const user = getStoredUser();
            const userName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Usuario';
            userInfoElements.forEach(el => {
                el.textContent = userName;
            });
        }
    });

    window.AuthGuard = {
        isAuthenticated,
        getStoredUser,
        protectPage,
        logout
    };
})();