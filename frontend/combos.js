let habilidadesGlobal = [];
let conjuntosGlobal = [];
let paginaActualCombo = 1;
const habilidadesPorPaginaCombo = 6;
let habilidadesMostradasCombo = [];


// Cargar datos al iniciar
cargarHabilidades();
cargarConjuntos();


// Obtener habilidades
function cargarHabilidades() {
  fetch('https://xenoverse-app-production.up.railway.app/api/habilidades')
    .then(res => res.json())
    .then(data => {
      habilidadesGlobal = data;
      mostrarHabilidades(data);
    })
    .catch(error => console.log(error));
}


// Mostrar habilidades disponibles
function mostrarHabilidades(habilidades) {
  habilidadesMostradasCombo = habilidades;

  const lista = document.getElementById('lista-habilidades');
  const paginacion = document.getElementById('paginacion-combos');

  lista.innerHTML = "";
  paginacion.innerHTML = "";

  const inicio = (paginaActualCombo - 1) * habilidadesPorPaginaCombo;
  const fin = inicio + habilidadesPorPaginaCombo;

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
            ? `<img src="${habilidad.imagen}" class="imagen-habilidad">`
            : ""
        }

        <div class="info-habilidad">
          <h3>${habilidad.nombre}</h3>
          <p>${habilidad.descripcion}</p>
          <p><strong>Categoría:</strong> ${habilidad.categoria}</p>

          <button onclick="agregarAConjunto(${habilidad.id})">
            Agregar al conjunto seleccionado
          </button>

          ${
            esFavorito
              ? `<button onclick="eliminarFavorito(${habilidad.id})">
                  Quitar favorito
                </button>`
              : `<button onclick="agregarFavorito(${habilidad.id})">
                  Favorito
                </button>`
          }
        </div>

      </div>
    `;

    lista.appendChild(card);
  });

  crearPaginacionCombo(habilidades.length);
}


function cargarConjuntos() {

  const usuario = JSON.parse(
    localStorage.getItem('usuario')
  );

  fetch(`https://xenoverse-app-production.up.railway.app/api/conjuntos?usuario_id=${usuario.id}`)

    .then(res => res.json())

    .then(data => {

      conjuntosGlobal = data;

      llenarSelectConjuntos(data);

      mostrarConjuntos(data);

    })

    .catch(error => console.log(error));
}

// Llenar selector de conjuntos
function llenarSelectConjuntos(conjuntos) {
  const select = document.getElementById('select-conjuntos');
  select.innerHTML = "";

  conjuntos.forEach(conjunto => {
    const option = document.createElement('option');
    option.value = conjunto.id;
    option.textContent = conjunto.nombre;
    select.appendChild(option);
  });
}


// Mostrar conjuntos creados
function mostrarConjuntos(conjuntos) {
  const lista = document.getElementById('lista-conjuntos');
  lista.innerHTML = "";

  conjuntos.forEach(conjunto => {
    const card = document.createElement('div');
    card.classList.add('card');

    const habilidades = conjunto.habilidades || [];

    const normales = habilidades.filter(
      h => h.categoria === "ki" || h.categoria === "golpe"
    ).length;

    const supers = habilidades.filter(
      h => h.categoria === "super_ki" || h.categoria === "super_golpe"
    ).length;

    const transformaciones = habilidades.filter(
      h => h.categoria === "transformacion"
    ).length;

    const esquives = habilidades.filter(
      h => h.categoria === "esquive"
    ).length;

    let habilidadesHTML = "";

    if (habilidades.length === 0) {
      habilidadesHTML = "<li>Sin habilidades</li>";
    } else {
      habilidadesHTML = habilidades.map(h => {
        return `<li>${h.nombre} - ${h.categoria}</li>`;
      }).join("");
    }

    card.innerHTML = `
      <h3>${conjunto.nombre}</h3>
      <p>${conjunto.descripcion}</p>

      <div class="slots">
        <p>Habilidades normales: ${normales}/4</p>
        <p>Super técnicas: ${supers}/2</p>
        <p>Transformación: ${transformaciones}/1</p>
        <p>Esquive: ${esquives}/1</p>
      </div>

      <h4>Habilidades del conjunto:</h4>
      <ul>
        ${habilidadesHTML}
      </ul>

      <button onclick="editarConjunto(${conjunto.id})">
        Editar conjunto
      </button>

      <button onclick="reproducirSonidoEliminar(); eliminarConjunto(${conjunto.id})">
        Eliminar conjunto
      </button>
    `;

    lista.appendChild(card);
  });
}


// Crear conjunto
function agregarConjunto() {
  const nombre = document.getElementById('nombreConjunto').value;
  const descripcion = document.getElementById('descripcionConjunto').value;
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  fetch('https://xenoverse-app-production.up.railway.app/api/conjuntos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre,
      descripcion,
      usuario_id: usuario.id
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log('Conjunto creado:', data);
    cargarConjuntos();

    document.getElementById('nombreConjunto').value = "";
    document.getElementById('descripcionConjunto').value = "";
  })
  .catch(error => console.log(error));
}


// Agregar habilidad a conjunto
function agregarAConjunto(habilidadId) {
  const conjuntoId = document.getElementById('select-conjuntos').value;

  fetch(`https://xenoverse-app-production.up.railway.app/api/conjuntos/${conjuntoId}/habilidades`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      habilidadId
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      alert(data.error);
      return;
    }

    console.log("Agregado al conjunto:", data);
    cargarConjuntos();
  })
  .catch(error => console.log(error));
}


// Eliminar conjunto
function eliminarConjunto(id) {
  fetch(`https://xenoverse-app-production.up.railway.app/api/conjuntos/${id}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(data => {
    console.log('Eliminado:', data);
    cargarConjuntos();
  })
  .catch(error => console.log(error));
}


// Filtros de categorías
function filtrarCategoriaCombo(categoria) {
  paginaActualCombo = 1;

  const filtradas = habilidadesGlobal.filter(habilidad => habilidad.categoria === categoria);
  mostrarHabilidades(filtradas);
}


function mostrarTodasCombo() {
  paginaActualCombo = 1;

  mostrarHabilidades(habilidadesGlobal);
}


function mostrarFavoritosCombo() {
  paginaActualCombo = 1;

  const favoritos = obtenerFavoritos();

  const habilidadesFavoritas = habilidadesGlobal.filter(habilidad =>
    favoritos.includes(habilidad.id)
  );

  mostrarHabilidades(habilidadesFavoritas);
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


// Botón para bajar a combos creados
function irACombos() {
  document.getElementById('lista-conjuntos').scrollIntoView({
    behavior: 'smooth'
  });
}

let idConjuntoEditando = null;

function editarConjunto(id) {

  const conjunto = conjuntosGlobal.find(c => c.id === id);

  if (!conjunto) return;

  idConjuntoEditando = id;

  document.getElementById('editNombreCombo').value =
    conjunto.nombre;

  document.getElementById('editDescripcionCombo').value =
    conjunto.descripcion;

  mostrarHabilidadesEnModal(conjunto);

  document.getElementById('modalEditarCombo').style.display =
    "flex";
}


function mostrarHabilidadesEnModal(conjunto) {

  const contenedor =
    document.getElementById('habilidadesComboEditar');

  contenedor.innerHTML = "";

  if (!conjunto.habilidades || conjunto.habilidades.length === 0) {

    contenedor.innerHTML =
      "<p>Este combo no tiene habilidades.</p>";

    return;
  }

  conjunto.habilidades.forEach(habilidad => {

    const item = document.createElement('div');

    item.classList.add('card');

    item.innerHTML = `
      <h3>${habilidad.nombre}</h3>

      <p>
        <strong>Categoría:</strong>
        ${habilidad.categoria}
      </p>

      <button onclick="
        quitarHabilidadDeCombo(
          ${conjunto.id},
          ${habilidad.id}
        )
      ">
        Quitar habilidad
      </button>
    `;

    contenedor.appendChild(item);

  });
}


function quitarHabilidadDeCombo(conjuntoId, habilidadId) {

  fetch(
    `https://xenoverse-app-production.up.railway.app/api/conjuntos/${conjuntoId}/habilidades/${habilidadId}`,
    {
      method: 'DELETE'
    }
  )

  .then(res => res.json())

  .then(data => {

    if (data.error) {
      alert(data.error);
      return;
    }

    cargarConjuntos();

    setTimeout(() => {

      const actualizado =
        conjuntosGlobal.find(c => c.id === conjuntoId);

      if (actualizado) {
        mostrarHabilidadesEnModal(actualizado);
      }

    }, 200);

  })

  .catch(error => console.log(error));
}


function actualizarConjuntoModal() {

  const nombre =
    document.getElementById('editNombreCombo').value;

  const descripcion =
    document.getElementById('editDescripcionCombo').value;

  fetch(
    `https://xenoverse-app-production.up.railway.app/api/conjuntos/${idConjuntoEditando}`,
    {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        nombre,
        descripcion
      })
    }
  )

  .then(res => res.json())

  .then(data => {

    if (data.error) {
      alert(data.error);
      return;
    }

    cerrarModalCombo();

    cargarConjuntos();

  })

  .catch(error => console.log(error));
}


function cerrarModalCombo() {

  idConjuntoEditando = null;

  document.getElementById('modalEditarCombo').style.display =
    "none";
}

function crearPaginacionCombo(totalHabilidades) {
  const paginacion = document.getElementById('paginacion-combos');

  const totalPaginas = Math.ceil(totalHabilidades / habilidadesPorPaginaCombo);

  if (totalPaginas <= 1) {
    paginacion.innerHTML = "";
    return;
  }

  for (let i = 1; i <= totalPaginas; i++) {
    const boton = document.createElement('button');
    boton.textContent = i;

    if (i === paginaActualCombo) {
      boton.classList.add('pagina-activa');
    }

    boton.onclick = () => {
      reproducirSonidoBoton();
      paginaActualCombo = i;
      mostrarHabilidades(habilidadesMostradasCombo);
    };

    paginacion.appendChild(boton);
  }
}