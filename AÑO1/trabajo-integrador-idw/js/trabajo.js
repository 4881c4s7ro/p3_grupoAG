// trabajo.js - Lógica de la aplicación admin usando DummyJSON
(() => {
	const API_BASE = 'https://dummyjson.com';

	// Cached DOM
	let loginSection, loginForm, adminNav, usersSection, usersList, refreshUsersBtn, logoutBtn, userBadge;
	let showCreateUserBtn, createUserFormWrap, formCreateUser, cancelCreateBtn;

	function qs(id) { return document.getElementById(id); }

	document.addEventListener('DOMContentLoaded', init);

	function init() {
		// cache elements
		loginSection = qs('loginSection');
		loginForm = qs('loginForm');
		adminNav = qs('adminNav');
		usersSection = qs('usersSection');
		usersList = qs('usersList');
		refreshUsersBtn = qs('refreshUsers');
		logoutBtn = qs('logoutBtn');
		userBadge = qs('userBadge');
		showCreateUserBtn = qs('showCreateUser');
		createUserFormWrap = qs('createUserForm');
		formCreateUser = qs('formCreateUser');
		cancelCreateBtn = qs('cancelCreate');

		loginForm.addEventListener('submit', onLogin);
		logoutBtn.addEventListener('click', onLogout);
		adminNav.addEventListener('click', onNavClick);
		refreshUsersBtn.addEventListener('click', fetchAndRenderUsers);
		showCreateUserBtn.addEventListener('click', () => createUserFormWrap.classList.remove('hidden'));
		cancelCreateBtn.addEventListener('click', () => createUserFormWrap.classList.add('hidden'));
		formCreateUser.addEventListener('submit', onCreateUser);

		updateUI();
	}

	// UI helpers
	function updateUI() {
		if (isLogged()) {
			loginSection.classList.add('hidden');
			adminNav.classList.remove('hidden');
			logoutBtn.classList.remove('hidden');
			const user = getStoredUser();
			userBadge.classList.remove('hidden');
			userBadge.textContent = user ? `${user.firstName || ''} ${user.lastName || ''}` : 'Usuario';
			// show default section
			showSection('users');
			// populate users
			fetchAndRenderUsers();
		} else {
			loginSection.classList.remove('hidden');
			adminNav.classList.add('hidden');
			logoutBtn.classList.add('hidden');
			userBadge.classList.add('hidden');
			usersSection.classList.add('hidden');
		}
	}

	function showSection(name) {
		// hide all
		usersSection.classList.add('hidden');
		if (name === 'users') usersSection.classList.remove('hidden');
	}

	function onNavClick(e) {
		const btn = e.target.closest('button[data-section]');
		if (!btn) return;
		const section = btn.getAttribute('data-section');
		showSection(section);
		if (section === 'users') fetchAndRenderUsers();
	}

	// Auth
	async function onLogin(e) {
		e.preventDefault();
		const form = e.target;
		const data = new FormData(form);
		const username = data.get('username');
		const password = data.get('password');

		try {
			const res = await fetch(`${API_BASE}/auth/login`, {
				method: 'POST',
				headers: {'Content-Type':'application/json'},
				body: JSON.stringify({ username, password })
			});
			if (!res.ok) {
				const err = await res.json().catch(()=>({message:'Error al autenticarse'}));
				return alert(`Login falló: ${err.message || res.statusText}`);
			}
			const payload = await res.json();
			// save token and user
			sessionStorage.setItem('accessToken', payload.accessToken);
			sessionStorage.setItem('user', JSON.stringify(payload));
			alert('Sesión iniciada correctamente');
			// Redirigir a la página home después del login exitoso
			window.location.href = 'home.html';
		} catch (err) {
			console.error(err);
			alert('Error de red al intentar iniciar sesión');
		}
	}

	function onLogout() {
		sessionStorage.removeItem('accessToken');
		sessionStorage.removeItem('user');
		updateUI();
	}

	function isLogged() { return !!sessionStorage.getItem('accessToken'); }
	function getStoredUser(){ try { return JSON.parse(sessionStorage.getItem('user') || 'null'); } catch(e){return null} }

	function authHeaders(){
		const token = sessionStorage.getItem('accessToken');
		return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type':'application/json'} : { 'Content-Type':'application/json' };
	}

	// Users CRUD
	async function fetchAndRenderUsers() {
		if (!isLogged()) { alert('Debe iniciar sesión para ver usuarios'); return; }
		usersList.innerHTML = '<p>Cargando usuarios...</p>';
		try {
			const res = await fetch(`${API_BASE}/users?limit=100`, { headers: authHeaders() });
			if (!res.ok) throw new Error('Error al obtener usuarios');
			const data = await res.json();
			renderUsers(data.users || []);
		} catch (err) {
			console.error(err);
			usersList.innerHTML = `<p>Error cargando usuarios: ${err.message}</p>`;
		}
	}

	function renderUsers(users) {
		if (!Array.isArray(users)) users = [];
		if (users.length === 0) { usersList.innerHTML = '<p>No hay usuarios.</p>'; return; }
		const table = document.createElement('table');
		const thead = document.createElement('thead');
		thead.innerHTML = '<tr><th>ID</th><th>Nombre</th><th>Username</th><th>Email</th><th>Teléfono</th><th>Acciones</th></tr>';
		table.appendChild(thead);
		const tbody = document.createElement('tbody');
		users.forEach(u => {
			const tr = document.createElement('tr');
			tr.innerHTML = `
				<td>${u.id}</td>
				<td>${escapeHtml((u.firstName||'') + ' ' + (u.lastName||''))}</td>
				<td>${escapeHtml(u.username||'')}</td>
				<td>${escapeHtml(u.email||'')}</td>
				<td>${escapeHtml(u.phone||'')}</td>
				<td></td>
			`;
			const actionsTd = tr.querySelector('td:last-child');
			const editBtn = document.createElement('button'); editBtn.textContent = 'Editar';
			editBtn.addEventListener('click', ()=> onEditUser(u));
			const delBtn = document.createElement('button'); delBtn.textContent = 'Eliminar';
			delBtn.addEventListener('click', ()=> onDeleteUser(u));
			actionsTd.appendChild(editBtn); actionsTd.appendChild(delBtn);
			tbody.appendChild(tr);
		});
		table.appendChild(tbody);
		usersList.innerHTML = '';
		usersList.appendChild(table);
	}

	function escapeHtml(s){ return String(s).replace(/[&<>"]+/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

	async function onCreateUser(e) {
		e.preventDefault();
		if (!isLogged()) return alert('Debe iniciar sesión');
		const fd = new FormData(formCreateUser);
		const body = {
			firstName: fd.get('firstName'),
			lastName: fd.get('lastName'),
			username: fd.get('username'),
			email: fd.get('email'),
			phone: fd.get('phone')
		};
		try {
			const res = await fetch(`${API_BASE}/users/add`, {
				method: 'POST',
				headers: authHeaders(),
				body: JSON.stringify(body)
			});
			if (!res.ok) throw new Error('Error al crear usuario');
			const created = await res.json();
			alert(`Usuario creado con id ${created.id}`);
			createUserFormWrap.classList.add('hidden');
			formCreateUser.reset();
			fetchAndRenderUsers();
		} catch (err) {
			console.error(err);
			alert('Error creando usuario: ' + err.message);
		}
	}

	async function onEditUser(u) {
		if (!isLogged()) return alert('Debe iniciar sesión');
		// simple prompt-based edit for demo
		const firstName = prompt('Nombre', u.firstName) || u.firstName;
		const lastName = prompt('Apellido', u.lastName) || u.lastName;
		const email = prompt('Email', u.email) || u.email;
		const phone = prompt('Teléfono', u.phone) || u.phone;
		const body = { firstName, lastName, email, phone };
		try {
			const res = await fetch(`${API_BASE}/users/${u.id}`, {
				method: 'PUT',
				headers: authHeaders(),
				body: JSON.stringify(body)
			});
			if (!res.ok) throw new Error('Error actualizando usuario');
			await res.json();
			alert('Usuario actualizado');
			fetchAndRenderUsers();
		} catch (err) {
			console.error(err);
			alert('Error actualizando usuario: ' + err.message);
		}
	}

	async function onDeleteUser(u) {
		if (!isLogged()) return alert('Debe iniciar sesión');
		if (!confirm(`Eliminar usuario ${u.username || u.id}?`)) return;
		try {
			const res = await fetch(`${API_BASE}/users/${u.id}`, {
				method: 'DELETE',
				headers: authHeaders()
			});
			if (!res.ok) throw new Error('Error eliminando usuario');
			await res.json();
			alert('Usuario eliminado');
			fetchAndRenderUsers();
		} catch (err) {
			console.error(err);
			alert('Error eliminando usuario: ' + err.message);
		}
	}

})();

