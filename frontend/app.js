// 🔥 Obtener habilidades desde la API
fetch('http://localhost:3000/api/habilidades')
  .then(res => res.json())
  .then(data => {
    const lista = document.getElementById('lista-habilidades');
    lista.innerHTML = ""; // limpiar

    data.forEach(habilidad => {
      const li = document.createElement('div');
      li.classList.add('card');

      li.innerHTML = `
        ${habilidad.nombre} - ${habilidad.categoria}
        <button onclick="eliminarHabilidad(${habilidad.id})">Eliminar</button>
        <button onclick="agregarAConjunto(${habilidad.id})">Agregar a conjunto</button>
      `;

      lista.appendChild(li);
    });
  })
  .catch(error => console.log(error));


// 🔥 Agregar habilidad
function agregarHabilidad() {
  const nombre = document.getElementById('nombre').value;
  const descripcion = document.getElementById('descripcion').value;
  const categoria = document.getElementById('categoria').value;

  fetch('http://localhost:3000/api/habilidades', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre,
      descripcion,
      categoria
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log('Agregado:', data);
    location.reload();
  })
  .catch(error => console.log(error));
}


// 🔥 Eliminar habilidad
function eliminarHabilidad(id) {
  fetch(`http://localhost:3000/api/habilidades/${id}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(data => {
    console.log('Eliminado:', data);
    location.reload();
  })
  .catch(error => console.log(error));
}


// 🔥 Obtener conjuntos
fetch('http://localhost:3000/api/conjuntos')
  .then(res => res.json())
  .then(data => {
    const lista = document.getElementById('lista-conjuntos');
    lista.innerHTML = ""; // limpiar

    data.forEach(conjunto => {
      const li = document.createElement('div');
      li.classList.add('card');

      // 🔥 construir lista de habilidades
      let habilidadesHTML = "";

      if (conjunto.habilidades && conjunto.habilidades.length > 0) {
        conjunto.habilidades.forEach(h => {
          habilidadesHTML += `<li>${h.nombre}</li>`;
        });
      } else {
        habilidadesHTML = "<li>Sin habilidades</li>";
      }

      li.innerHTML = `
        <strong>${conjunto.nombre}</strong> - ${conjunto.descripcion}
        <button onclick="eliminarConjunto(${conjunto.id})">Eliminar</button>

        <ul>
          ${habilidadesHTML}
        </ul>
      `;

      lista.appendChild(li);
    });
  })
  .catch(error => console.log(error));


// 🔥 Agregar conjunto
function agregarConjunto() {
  const nombre = document.getElementById('nombreConjunto').value;
  const descripcion = document.getElementById('descripcionConjunto').value;

  fetch('http://localhost:3000/api/conjuntos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre,
      descripcion
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log('Conjunto creado:', data);
    location.reload();
  })
  .catch(error => console.log(error));
}


// 🔥 Eliminar conjunto
function eliminarConjunto(id) {
  fetch(`http://localhost:3000/api/conjuntos/${id}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(data => {
    console.log('Eliminado:', data);
    location.reload();
  })
  .catch(error => console.log(error));
}


// 🔥 Agregar habilidad a conjunto
function agregarAConjunto(habilidadId) {
  const conjuntoId = document.getElementById('select-conjuntos').value;

  fetch(`http://localhost:3000/api/conjuntos/${conjuntoId}/habilidades`, {
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
    console.log("Agregado al conjunto:", data);
    alert("Habilidad agregada al conjunto");
    location.reload();
  })
  .catch(error => console.log(error));
}

// 🔥 Llenar selector de conjuntos
fetch('http://localhost:3000/api/conjuntos')
  .then(res => res.json())
  .then(data => {
    const select = document.getElementById('select-conjuntos');

    data.forEach(conjunto => {
      const option = document.createElement('option');
      option.value = conjunto.id;
      option.textContent = conjunto.nombre;

      select.appendChild(option);
    });
  })
  .catch(error => console.log(error));