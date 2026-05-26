const sonidosBotones = [
  new Audio('audio/ui1.wav'),
  new Audio('audio/ui2.wav')
];

function reproducirSonidoBoton() {

  const sonido =
    sonidosBotones[
      Math.floor(Math.random() * sonidosBotones.length)
    ];

  sonido.currentTime = 0;

  sonido.volume = 0.4;

  sonido.play();
}

function reproducirSonidoEliminar() {

  const sonido = new Audio(
    'audio/delete.wav'
  );

  sonido.volume = 0.6;

  sonido.play();
}