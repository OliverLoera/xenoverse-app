function seleccionarRaza(raza) {

  const usuario = JSON.parse(
    localStorage.getItem('usuario')
  );

  if (!usuario) {

    alert('Debes iniciar sesión');

    window.location.href = "login.html";

    return;
  }

  const sonidos = {
    sayajin: new Audio('audio/sayajin.wav'),
    majin: new Audio('audio/majin.wav'),
    humano: new Audio('audio/humano.wav'),
    namekiano: new Audio('audio/namekiano.wav'),
    freezer: new Audio('audio/freezer.wav')
  };

  fetch(`https://xenoverse-app-production.up.railway.app/api/usuarios/${usuario.id}/raza`, {

    method: 'PUT',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      raza
    })

  })

  .then(res => res.json())

  .then(data => {

    if (data.error) {

      alert(data.error);

      return;
    }

    usuario.raza = raza;

    localStorage.setItem(
      'usuario',
      JSON.stringify(usuario)
    );

    localStorage.setItem('raza', raza);

    if (sonidos[raza]) {

      sonidos[raza].volume = 0.7;

      sonidos[raza].play();

      setTimeout(() => {

        window.location.href = "index.html";

      }, 2300);

    } else {

      window.location.href = "index.html";

    }

  })

  .catch(error => console.log(error));
}