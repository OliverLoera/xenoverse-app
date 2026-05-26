function login() {

  const email = document.getElementById('email').value;

  const password = document.getElementById('password').value;

  fetch('http://localhost:3000/api/login', {

    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      email,
      password
    })

  })

  .then(res => res.json())

  .then(data => {

    if (data.error) {
      alert(data.error);
      return;
    }

    localStorage.setItem(
      'usuario',
      JSON.stringify(data.usuario)
    );

    alert('Bienvenido ' + data.usuario.nombre);

    if (data.usuario.raza) {
      localStorage.setItem('raza', data.usuario.raza);
      window.location.href = "index.html";
    } else {
      window.location.href = "seleccionar-raza.html";
    }

  })

  .catch(error => console.log(error));
}
