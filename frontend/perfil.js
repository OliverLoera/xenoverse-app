const usuario = JSON.parse(
  localStorage.getItem('usuario')
);

if (usuario) {

  document.getElementById('nombreUsuario').textContent =
    usuario.nombre;

  document.getElementById('correoUsuario').textContent =
    usuario.email;

  document.getElementById('razaUsuario').textContent =
    usuario.raza || "Sin raza";

}

function obtenerClaveFotoPerfil() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  return `foto_perfil_usuario_${usuario.id}`;
}

function cargarFotoPerfil() {
  const fotoGuardada = localStorage.getItem(obtenerClaveFotoPerfil());

  if (fotoGuardada) {
    document.getElementById('fotoPerfil').src = fotoGuardada;
  }
}

function cambiarFotoPerfil(event) {
  const archivo = event.target.files[0];

  if (!archivo) return;

  const lector = new FileReader();

  lector.onload = function(e) {
    const imagenBase64 = e.target.result;

    localStorage.setItem(obtenerClaveFotoPerfil(), imagenBase64);

    document.getElementById('fotoPerfil').src = imagenBase64;
  };

  lector.readAsDataURL(archivo);
}

cargarFotoPerfil();

function actualizarPerfil() {

  const usuario = JSON.parse(
    localStorage.getItem('usuario')
  );

  const nombre =
  document.getElementById('nuevoNombre').value;

  const correo =
    document.getElementById('nuevoCorreo').value;

  const password =
    document.getElementById('nuevaPassword').value;

  if (!nombre && !correo && !password) {

    alert(
      'Debes modificar al menos un campo'
    );

    return;
  }

  fetch(`http://localhost:3000/api/usuarios/${usuario.id}`, {

    method: 'PUT',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      nombre,
      correo,
      password
    })

  })

  .then(res => res.json())

  .then(data => {

    if (data.error) {

      alert(data.error);

      return;
    }

    usuario.nombre = nombre || usuario.nombre;
    usuario.email = correo || usuario.email;

    localStorage.setItem(
      'usuario',
      JSON.stringify(usuario)
    );

    alert(
      'Perfil actualizado correctamente'
    );

    location.reload();

  })

  .catch(error => console.log(error));
}