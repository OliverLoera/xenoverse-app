function registrar() {
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('https://xenoverse-app-production.up.railway.app/api/registro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre,
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

    alert('Cuenta creada correctamente');
    window.location.href = "login.html";
  })
  .catch(error => console.log(error));
}