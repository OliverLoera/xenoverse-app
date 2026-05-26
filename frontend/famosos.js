const personajes = {
  sayajin: [
    {
      nombre: "Son Goku",
      imagen: "https://static.wikia.nocookie.net/dragonball/images/c/c0/Son_Goku_en_Super_Hero.png/revision/latest?cb=20220302091733&path-prefix=es",
      audio: "audio/famosos/goku.wav",
      descripcion: "Saiyajin criado en la Tierra, conocido por su espíritu de superación y su dominio del ki."
    },
    {
      nombre: "Vegeta",
      imagen: "https://static.wikia.nocookie.net/featteca/images/d/d6/Vegeta_Base_Render.png/revision/latest/scale-to-width-down/480?cb=20230827033146&path-prefix=es",
      audio: "audio/famosos/vegeta.mp3",
      descripcion: "Príncipe de los saiyajin, orgulloso guerrero con gran poder ofensivo."
    },
    {
      nombre: "Broly",
      imagen: "https://static.wikia.nocookie.net/featteca/images/3/34/Broly_DBS_Base.png/revision/latest?cb=20210212001410&path-prefix=es",
      audio: "audio/famosos/broly.wav",
      descripcion: "Saiyajin de poder descomunal, conocido por su fuerza salvaje y crecimiento explosivo."
    },
    {
      nombre: "Bardock",
      imagen: "https://static.wikia.nocookie.net/dragonball/images/3/30/Bardock_%28Super%29_artwork.png/revision/latest?cb=20181121143103&path-prefix=es",
      descripcion: "Padre del guerrero Kakaroto o tambien conocido como Goku, fue probablemente el primer sayajin en morir el dia que su planeta exploto."
    },
    {
      nombre: "Cabba",
      imagen: "https://static.wikia.nocookie.net/featteca/images/1/17/Cabba_Base.png/revision/latest?cb=20220629235056&path-prefix=es",
      descripcion: "Joven saiyajin del Universo 6 con gran potencial. Respetuoso y noble, busca perfeccionar sus habilidades siguiendo el orgullo de su raza."
    },
    {
      nombre: "Kale",
      imagen: "https://cdn.shopify.com/s/files/1/0252/1736/8154/files/Kale_dbs_by_saodvd-dbvl241_large.png?v=1587133165",
      descripcion: "Saiyajin del Universo 6 con un inmenso poder oculto. Su transformación desata una fuerza salvaje comparable a la de un berserker legendario."
    },
    {
      nombre: "Caulifla",
      imagen: "https://static.wikia.nocookie.net/dragonball/images/d/d6/Caulifla_render.png/revision/latest?cb=20170729082618&path-prefix=es",
      descripcion: "Saiyajin rebelde y segura de sí misma, conocida por aprender técnicas rápidamente y buscar constantemente nuevos desafíos."
    },
    {
      nombre: "Vegito",
      imagen: "https://static.wikia.nocookie.net/dragonball/images/c/c6/Arte_de_Vegetto_en_Dokkan_Battle.png/revision/latest?cb=20210507224508&path-prefix=es",
      descripcion: "Resultado de la fusión Potara entre Goku y Vegeta. Su inmenso poder y actitud confiada lo convierten en uno de los guerreros más fuertes."
    },
    {
      nombre: "Gogeta",
      imagen: "https://static.wikia.nocookie.net/dragonball/images/9/9b/Gogeta_Super_artwork.png/revision/latest?cb=20181223195723&path-prefix=es",
      descripcion: "Guerrero nacido de la fusión Metamoru entre Goku y Vegeta. Combina velocidad, poder y precisión en un luchador casi imparable."
    }
  ],

  humano: [
    {
      nombre: "Krilin",
      imagen: "https://static.wikia.nocookie.net/dragonball/images/4/41/Krilin_Universo7.png/revision/latest/scale-to-width/360?cb=20170705064045&path-prefix=es",
      audio: "audio/famosos/krilin.wav",
      descripcion: "Uno de los humanos más fuertes, experto en técnicas de ki y combate estratégico."
    },
    {
      nombre: "Maestro Roshi",
      imagen: "https://static.wikia.nocookie.net/dragonball/images/1/13/KameSennin_Universo7.png/revision/latest/scale-to-width/360?cb=20170705064144&path-prefix=es",
      audio: "audio/famosos/roshi.wav",
      descripcion: "Legendario maestro de artes marciales conocido por entrenar a grandes guerreros como Goku y Krilin. Combina sabiduría, experiencia y técnicas devastadoras."
    },
    {
      nombre: "Bulma",
      imagen: "https://static.wikia.nocookie.net/dragonball/images/0/00/Bulma_Daima.png/revision/latest/scale-to-width/360?cb=20241129081349&path-prefix=es",
      audio: "audio/famosos/bulma.wav",
      descripcion: "Científica brillante y una de las mentes más inteligentes de la Tierra. Fundadora clave de la tecnología cápsula y aliada fundamental de los Guerreros Z."
    },
    {
      nombre: "Yamcha",
      imagen: "https://static.wikia.nocookie.net/dragonball/images/b/b0/Yamcha_%28Cell%29.png/revision/latest/scale-to-width/360?cb=20201224190500&path-prefix=es",
      descripcion: "Guerrero humano conocido por su estilo de combate ágil y técnicas como el Rōgafūfūken."
    },
    {
      nombre: "Ten Shin Han",
      imagen: "https://static.wikia.nocookie.net/dragonball/images/0/02/Tenshinhan_Universo7.png/revision/latest/scale-to-width/360?cb=20170705063924&path-prefix=es",
      descripcion: "Guerrero disciplinado con habilidades únicas y gran dominio del combate físico. Destaca por su entrenamiento extremo y su poderosa técnica Kikoho."
    },
    {
      nombre: "Videl",
      imagen: "https://static.wikia.nocookie.net/doblaje/images/2/27/VidelFNFDokkanBattle.png/revision/latest/scale-to-width/360?cb=20180815003900&path-prefix=es",
      descripcion: "Valiente luchadora e hija de Mr. Satán. Aunque humana, posee un fuerte sentido de justicia y habilidades de combate destacables."
    },
    {
      nombre: "Mr Satan",
      imagen: "https://static.wikia.nocookie.net/doblaje/images/d/d1/Mr_Satan_Artwork.png/revision/latest?cb=20170803054741&path-prefix=es",
      descripcion: "Campeón mundial de artes marciales y celebridad reconocida en toda la Tierra. Aunque exagera sus logros, ha demostrado gran carisma y valentía."
    }
  ],

  namekiano: [
    {
      nombre: "Piccolo",
      imagen: "https://static.wikitide.net/greatcharacterswiki/thumb/1/14/Piccolo_Super_Hero_Infobox_2.png/300px-Piccolo_Super_Hero_Infobox_2.png",
      audio: "audio/famosos/piccoro.wav",
      descripcion: "Namekiano sabio y poderoso, experto en combate, estrategia y regeneración."
    },
    {
      nombre: "Nail",
      imagen: "https://static.wikia.nocookie.net/dragonball/images/6/60/Nail_Artwork.png/revision/latest?cb=20160722194728&path-prefix=es",
      audio: "audio/famosos/nail.wav",
      descripcion: "Guerrero namekiano protector del Gran Patriarca, fuerte y disciplinado."
    },
    {
      nombre: "Dende",
      imagen: "https://static.wikia.nocookie.net/dragon-ball-legendary-dbl/images/3/38/Teen_dende.png/revision/latest?cb=20140511160800&path-prefix=es",
      audio: "audio/famosos/dende.wav",
      descripcion: "Namekiano con grandes habilidades curativas y espirituales. Más adelante se convierte en el nuevo guardián de la Tierra."
    },
    {
      nombre: "Gran Patriarca",
      imagen: "https://static.wikia.nocookie.net/dragonball/images/a/a6/Gran_Patriarca_Dokkan.png/revision/latest/thumbnail/width/360/height/360?cb=20190316165041&path-prefix=es",
      descripcion: "Líder sabio y anciano de los namekianos. Posee profundos conocimientos espirituales y la capacidad de despertar el potencial oculto."
    },
  ],

  majin: [
    {
      nombre: "Majin Buu",
      imagen: "https://static.wikia.nocookie.net/featteca/images/0/09/Buu_Gordo.webp/revision/latest?cb=20220624202535&path-prefix=es",
      audio: "audio/famosos/majinbuu.wav",
      descripcion: "Ser mágico con habilidades impredecibles, gran resistencia y poderes de absorción."
    },
    {
      nombre: "Kid Buu",
      imagen: "https://i.redd.it/my-drawing-of-kid-buu-v0-ieako68o5cqf1.png?width=512&format=png&auto=webp&s=2b1014befbafde535cc5968f9ac1ae7c753d09ab",
      audio: "audio/famosos/kidbuu.wav",
      descripcion: "Forma original y más caótica de Majin Buu. Destruye sin razón alguna y posee una naturaleza completamente impredecible."
    },
    {
      nombre: "Super Buu",
      imagen: "https://static.wikia.nocookie.net/villains/images/1/17/Super_Buu.png/revision/latest?cb=20130727003604",
      audio: "audio/famosos/superbuu.wav",
      descripcion: "Versión más inteligente y peligrosa de Majin Buu. Su capacidad de absorción le permite aumentar constantemente su poder."
    },
    {
      nombre: "Evil Buu",
      imagen: "https://static.wikia.nocookie.net/ultradragonball/images/f/fb/GrayBuu.png/revision/latest?cb=20240718015124",
      descripcion: "Manifestación pura de la maldad de Majin Buu. Delgado, agresivo y extremadamente violento, representa su lado más oscuro."
    },
    {
      nombre: "Majin Android 21",
      imagen: "https://static.wikia.nocookie.net/dragonball/images/a/a3/Majin_A-21_Artwork.png/revision/latest?cb=20180123020746&path-prefix=es",
      descripcion: "Personaje con poder majin, inteligencia científica y habilidades de absorción."
    }
  ],

  freezer: [
    {
      nombre: "Freezer",
      imagen: "https://static.wikia.nocookie.net/dragonball/images/e/e8/Freeza_artwork_Dragon_Ball_Super_Broly_%281%29.png/revision/latest/scale-to-width/360?cb=20200207113941&path-prefix=es",
      audio: "audio/famosos/freezer.wav",
      descripcion: "Demonio del frío conocido por sus transformaciones, velocidad y ataques de energía."
    },
    {
      nombre: "Cooler",
      imagen: "https://static.wikia.nocookie.net/dragonball/images/1/13/Forma_Final_de_Coola_en_Dragon_Ball_Z.png/revision/latest?cb=20220301192525&path-prefix=es",
      audio: "audio/famosos/cooler.wav",
      descripcion: "Hermano de Freezer, guerrero poderoso con una transformación adicional."
    },
    {
      nombre: "King Coold",
      imagen: "https://static.wikia.nocookie.net/doblaje/images/8/89/King_Cold.png/revision/latest?cb=20130213203722&path-prefix=es",
      audio: "audio/famosos/king cold.wav",
      descripcion: "Emperador del imperio galáctico y padre de Freezer. Frío, manipulador y poderoso, domina con autoridad absoluta."
    },
    {
      nombre: "Kuriza",
      imagen: "https://static.wikia.nocookie.net/caracteres/images/8/81/Kuriza_forma_final_render.png/revision/latest/scale-to-width-down/300?cb=20130130002924&path-prefix=es",
      descripcion: "Hijo de Freezer en la serie parodia Neko Majin. Comparte la arrogancia y habilidades de su padre con un estilo más cómico."
    },
    {
      nombre: "Chilled",
      imagen: "https://static.wikia.nocookie.net/dragonball/images/f/f8/Chilled_Artwork.png/revision/latest?cb=20180429022728&path-prefix=es",
      descripcion: "Ancestro de Freezer perteneciente al linaje de los demonios del frío. Cruel y dominante, gobernaba planetas mediante el miedo y la destrucción."
    }
  ]
};

function mostrarPersonajes(raza) {
  const riel = document.getElementById('riel-personajes');
  riel.innerHTML = "";

  personajes[raza].forEach(personaje => {
    const card = document.createElement('div');
    card.classList.add('personaje-card');

    card.innerHTML = `
      <img src="${personaje.imagen}" class="imagen-personaje">

      <h3>${personaje.nombre}</h3>

      <p>${personaje.descripcion}</p>

      ${
        personaje.audio
          ? `
            <button onclick="reproducirVoz('${personaje.audio}')">
              Escuchar voz
            </button>
          `
          : ""
      }
    `;

    riel.appendChild(card);
  });
}

mostrarPersonajes('sayajin');

function moverCarrusel(direccion) {
  const riel = document.getElementById('riel-personajes');

  const cantidad = 320;

  riel.scrollBy({
    left: direccion * cantidad,
    behavior: 'smooth'
  });
}

let audioActual = null;

function reproducirVoz(rutaAudio) {

  if (audioActual && !audioActual.paused) {
    return;
  }

  audioActual = new Audio(rutaAudio);

  audioActual.volume = 0.8;

  audioActual.play();
}