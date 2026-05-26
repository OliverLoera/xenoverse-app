function verificarSesion() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!usuario) {
    alert('Debes iniciar sesión primero');
    window.location.href = "login.html";
  }
}

function cerrarSesion() {
  localStorage.removeItem('usuario');
  localStorage.removeItem('raza');

  window.location.href = "login.html";
}

verificarSesion();