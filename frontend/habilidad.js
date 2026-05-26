const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));

let habilidadActual = null;

fetch('http://localhost:3000/api/habilidades')
  .then(res => res.json())
  .then(data => {
    habilidadActual = data.find(h => h.id === id);
    mostrarDetalle(habilidadActual);
  })
  .catch(error => console.log(error));


function mostrarDetalle(habilidad) {
  const contenedor = document.getElementById('detalle-habilidad');

  if (!habilidad) {
    contenedor.innerHTML = `
      <h2>Habilidad no encontrada</h2>
      <p>No se encontró información de esta habilidad.</p>
      <button onclick="window.location.href='index.html'">Volver al Home</button>
    `;
    return;
  }

  const favoritos = obtenerFavoritos();
  const esFavorito = favoritos.includes(habilidad.id);

  contenedor.innerHTML = `
    <div class="detalle-habilidad">

      ${
        habilidad.imagen
          ? `<img src="${habilidad.imagen}" class="imagen-detalle">`
          : ""
      }

      <div class="info-detalle">
        <h2>${habilidad.nombre}</h2>

        <p>
          <strong>Categoría:</strong>
          ${habilidad.categoria}
        </p>

        <p>${habilidad.descripcion}</p>

        <button onclick="reproducirSonidoBoton(); window.location.href='crear-combos.html'">
          Agregar a combo
        </button>

        ${
          esFavorito
            ? `<button onclick="reproducirSonidoBoton(); eliminarFavorito(${habilidad.id})">
                 Quitar favorito
               </button>`
            : `<button onclick="reproducirSonidoBoton(); agregarFavorito(${habilidad.id})">
                 Favorito
               </button>`
        }

        <button onclick="window.location.href='index.html'">
          Volver
        </button>
      </div>

    </div>
  `;
}


function obtenerClaveFavoritos() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!usuario) {
    return 'favoritos_invitado';
  }

  return `favoritos_usuario_${usuario.id}`;
}


function obtenerFavoritos() {
  return JSON.parse(localStorage.getItem(obtenerClaveFavoritos())) || [];
}


function guardarFavoritos(favoritos) {
  localStorage.setItem(
    obtenerClaveFavoritos(),
    JSON.stringify(favoritos)
  );
}


function agregarFavorito(habilidadId) {
  let favoritos = obtenerFavoritos();

  if (!favoritos.includes(habilidadId)) {
    favoritos.push(habilidadId);
    guardarFavoritos(favoritos);
  }

  mostrarDetalle(habilidadActual);
}


function eliminarFavorito(habilidadId) {
  let favoritos = obtenerFavoritos();

  favoritos = favoritos.filter(id => id !== habilidadId);

  guardarFavoritos(favoritos);

  mostrarDetalle(habilidadActual);
}