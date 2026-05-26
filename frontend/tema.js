function aplicarTema() {
  const raza = localStorage.getItem('raza');

  const temas = {
    sayajin: {
      principal: '#ff8c00',
      brillo: 'rgba(255, 140, 0, 0.6)'
    },
    majin: {
      principal: '#ff4fc3',
      brillo: 'rgba(255, 79, 195, 0.6)'
    },
    humano: {
      principal: '#2196f3',
      brillo: 'rgba(33, 150, 243, 0.6)'
    },
    namekiano: {
      principal: '#2ecc71',
      brillo: 'rgba(46, 204, 113, 0.6)'
    },
    freezer: {
      principal: '#b388ff',
      brillo: 'rgba(179, 136, 255, 0.6)'
    }
  };

  if (!raza || !temas[raza]) return;

  document.documentElement.style.setProperty(
    '--color-principal',
    temas[raza].principal
  );

  document.documentElement.style.setProperty(
    '--color-brillo',
    temas[raza].brillo
  );
}

aplicarTema();

const banner = document.getElementById('banner-raza');

if (banner) {

  const raza = localStorage.getItem('raza');

  const banners = {
    sayajin: 'img/banners/sayajin.png',
    humano: 'img/banners/humano.png',
    namekiano: 'img/banners/namekiano.png',
    majin: 'img/banners/majin.png',
    freezer: 'img/banners/freezer.png'
  };

  banner.src = banners[raza] || banners.sayajin;
}

const fondos = {
  sayajin: 'img/fondos/sayajin.png',
  humano: 'img/fondos/humano.png',
  namekiano: 'img/fondos/namekiano.png',
  majin: 'img/fondos/majin.png',
  freezer: 'img/fondos/freezer.png'
};

const razaFondo = localStorage.getItem('raza');

document.body.style.backgroundImage = `
  linear-gradient(
    rgba(0, 0, 0, 0.45),
    rgba(0, 0, 0, 0.55)
  ),
  url('${fondos[razaFondo] || fondos.sayajin}')
`;

document.body.style.backgroundSize = 'cover';
document.body.style.backgroundPosition = 'center';
document.body.style.backgroundAttachment = 'fixed';