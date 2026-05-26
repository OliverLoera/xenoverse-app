let habilidadesGlobal = [];
let idEditando = null;
let paginaActual = 1;
const habilidadesPorPagina = 6;
let habilidadesMostradas = [];

// Cargar habilidades al iniciar
cargarHabilidades();


// Obtener habilidades desde la API
function cargarHabilidades() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  fetch(`https://xenoverse-app-production.up.railway.app/api/habilidades?usuario_id=${usuario.id}`)
    .then(res => res.json())
    .then(data => {
      habilidadesGlobal = data;
      mostrarHabilidades(habilidadesGlobal);
    })
    .catch(error => console.log(error));
}


// Mostrar habilidades en pantalla
function mostrarHabilidades(habilidades) {
  habilidadesMostradas = habilidades;

  const lista = document.getElementById('lista-habilidades');
  const paginacion = document.getElementById('paginacion');

  lista.innerHTML = "";
  paginacion.innerHTML = "";

  const inicio = (paginaActual - 1) * habilidadesPorPagina;
  const fin = inicio + habilidadesPorPagina;

  const habilidadesPagina = habilidades.slice(inicio, fin);

  habilidadesPagina.forEach(habilidad => {
    const card = document.createElement('div');
    card.classList.add('card');

    const favoritos = obtenerFavoritos();
    const esFavorito = favoritos.includes(habilidad.id);

    card.innerHTML = `
      <div class="card-contenido">

        ${
          habilidad.imagen
            ? `
              <img
                src="${habilidad.imagen}"
                class="imagen-habilidad"
              >
            `
            : ""
        }

        <div class="info-habilidad">

          <h3>${habilidad.nombre}</h3>

          <p>${habilidad.descripcion}</p>

          <p>
            <strong>Categoría:</strong>
            ${habilidad.categoria}
          </p>

          <button onclick="reproducirSonidoBoton(); verHabilidad(${habilidad.id})">
            Ver más
          </button>

          <button onclick="reproducirSonidoBoton(); editarHabilidad(${habilidad.id})">
            Editar
          </button>

          <button onclick="reproducirSonidoEliminar(); eliminarHabilidad(${habilidad.id})">
            Eliminar
          </button>

          <button onclick="reproducirSonidoBoton(); irCrearCombo()">
            Agregar
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

        </div>

      </div>
    `;

    lista.appendChild(card);
  });

  crearPaginacion(habilidades.length);
}


// Filtrar por categoría
function filtrarCategoria(categoria) {

  paginaActual = 1;

  const filtradas = habilidadesGlobal.filter(habilidad => habilidad.categoria === categoria);
  mostrarHabilidades(filtradas);
}


// Mostrar todas
function mostrarTodas() {
  paginaActual = 1;

  mostrarHabilidades(habilidadesGlobal);
}


// Mostrar favoritos como filtro
function mostrarFavoritos() {
  paginaActual = 1;

  const favoritos = obtenerFavoritos();

  const habilidadesFavoritas = habilidadesGlobal.filter(habilidad =>
    favoritos.includes(habilidad.id)
  );

  mostrarHabilidades(habilidadesFavoritas);
}


// Ir a página de detalle
function verHabilidad(id) {
  window.location.href = `habilidad.html?id=${id}`;
}


// Ir a combos
function irCrearCombo() {
  window.location.href = "crear-combos.html";
}


// Decide si crear o actualizar
function guardarHabilidad() {
  if (idEditando === null) {
    agregarHabilidad();
  } else {
    actualizarHabilidad();
  }
}


// Crear habilidad
function agregarHabilidad() {
  const nombre = document.getElementById('nombre').value;
  const descripcion = document.getElementById('descripcion').value;
  const categoria = document.getElementById('categoria').value;
  const imagen = document.getElementById('imagen').value;

  if (
    !nombre.trim() ||
    !descripcion.trim()
  ) {

    alert(
      'Debes completar nombre y descripción'
    );

    return;
  }

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  fetch('https://xenoverse-app-production.up.railway.app/api/habilidades', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre,
      descripcion,
      categoria,
      imagen,
      usuario_id: usuario.id
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log('Habilidad creada:', data);

    limpiarFormulario();
    cargarHabilidades();
  })
  .catch(error => console.log(error));
}


// Cargar habilidad al formulario
function editarHabilidad(id) {
  const habilidad = habilidadesGlobal.find(h => h.id === id);

  if (!habilidad) return;

  idEditando = id;

  document.getElementById('editNombre').value = habilidad.nombre;
  document.getElementById('editDescripcion').value = habilidad.descripcion;
  document.getElementById('editCategoria').value = habilidad.categoria;
  document.getElementById('editImagen').value = habilidad.imagen || "";

  document.getElementById('modalEditar').style.display = "flex";
}

// Actualizar habilidad
function actualizarHabilidad() {
  const nombre = document.getElementById('editNombre').value;
  const descripcion = document.getElementById('editDescripcion').value;
  const categoria = document.getElementById('editCategoria').value;
  const imagen = document.getElementById('editImagen').value;

  fetch(`https://xenoverse-app-production.up.railway.app/api/habilidades/${idEditando}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre,
      descripcion,
      categoria,
      imagen
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log('Habilidad actualizada:', data);

    cerrarModalEditar();
    cargarHabilidades();
  })
  .catch(error => console.log(error));
}


// Limpiar formulario
function limpiarFormulario() {
  idEditando = null;

  document.getElementById('nombre').value = "";
  document.getElementById('descripcion').value = "";
  document.getElementById('imagen').value = "";
  document.getElementById('categoria').value = "golpe";
  document.getElementById('btnHabilidad').textContent = "Crear habilidad";

}


// Favoritos
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

  mostrarHabilidades(habilidadesGlobal);
}


function eliminarFavorito(habilidadId) {
  let favoritos = obtenerFavoritos();

  favoritos = favoritos.filter(id => id !== habilidadId);

  guardarFavoritos(favoritos);

  mostrarHabilidades(habilidadesGlobal);
}

function cerrarModalEditar() {
  idEditando = null;
  document.getElementById('modalEditar').style.display = "none";
}

function eliminarHabilidad(id) {
  const confirmar = confirm("¿Seguro que quieres eliminar esta habilidad?");

  if (!confirmar) return;

  fetch(`https://xenoverse-app-production.up.railway.app/api/habilidades/${id}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(data => {
    console.log('Habilidad eliminada:', data);
    cargarHabilidades();
  })
  .catch(error => console.log(error));
}

function buscarHabilidades() {
  paginaActual = 1;

  const texto = document
    .getElementById('busqueda')
    .value
    .toLowerCase();

  const filtradas = habilidadesGlobal.filter(habilidad => {

    return (
      habilidad.nombre.toLowerCase().includes(texto) ||

      habilidad.descripcion.toLowerCase().includes(texto) ||

      habilidad.categoria.toLowerCase().includes(texto)
    );

  });

  mostrarHabilidades(filtradas);
}

function crearPaginacion(totalHabilidades) {
  const paginacion = document.getElementById('paginacion');

  const totalPaginas = Math.ceil(totalHabilidades / habilidadesPorPagina);

  if (totalPaginas <= 1) {
    paginacion.innerHTML = "";
    return;
  }

  for (let i = 1; i <= totalPaginas; i++) {
    const boton = document.createElement('button');
    boton.textContent = i;

    if (i === paginaActual) {
      boton.classList.add('pagina-activa');
    }

    boton.onclick = () => {
      reproducirSonidoBoton();
      paginaActual = i;
      mostrarHabilidades(habilidadesMostradas);
    };

    paginacion.appendChild(boton);
  }
}