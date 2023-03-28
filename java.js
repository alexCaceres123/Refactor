/* Constants*/
const config = {
  puntMida: 10,
  maxRand: 29,
  totsPunts: 900,
  cAmple: 300,
  cAltura: 300,
  RETARD: 140,
  KEYBOARD_KEYS: {
    ESQUERRE_KEY: 'ArrowLeft',
    DRETA_KEY: 'ArrowRight',
    AMUNT_KEY: 'ArrowUp',
    AVALL_KEY: 'ArrowDown',
  },
};

/* Variables*/
let head;
let poma;
let ball;
let canvas;
let ctx;
let punts;
let pomaX;
let pomaY;
let esquerreDireccio = false;
let dretaDireccio = true;
let amuntDireccio = false;
let avallDireccio = false;
let inGame = true;
const x = new Array(config.totsPunts);
const y = new Array(config.totsPunts);
/* Fi Variables*/

window.onload = comienzoDeJuego;

/**
 * comienzoDeJuego
 */
function comienzoDeJuego() {
  canvas = document.getElementById('myCanvas');
  ctx = canvas.getContext('2d');

  head = new Image(); // head
  head.src = 'head.png';

  ball = new Image(); // ball
  ball.src = 'dot.png';

  poma = new Image();
  poma.src = 'apple.png';

  punts = 3; // punts per serp

  for (let z = 0; z < punts; z++) {
    x[z] = 50 - z * 10;
    y[z] = 50;
  }

  locateApple();

  setTimeout(gameCycle, config.RETARD);
}

/**
 * locate poma
 */
function locateApple() {
  let r = Math.floor(Math.random() * config.maxRand);
  pomaX = r * config.puntMida;

  r = Math.floor(Math.random() * config.maxRand);
  pomaY = r * config.puntMida;
}

/**
 * chequea poma
 */
function checkpoma() {
  if ((x[0] === pomaX) && (y[0] === pomaY)) {
    punts++;
    locateApple();
  }
}

/**
 * fi joc
 */
function finalJoc() {
  ctx.fillStyle = 'white';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.font = 'normal bold 18px serif';

  if (punts-3 === 1) {
    ctx.fillText(punts-3 + ' punt - ' + 'Game over',
        config.cAmple/2, config.cAltura/2);
  } else {
    ctx.fillText(punts-3 + ' punts - ' + 'Game over',
        config.cAmple/2, config.cAltura/2);
  }
}


/**
 * Funció que detecta les col·lisions
 */
function colisio() {
  for (let z = punts; z > 0; z--) {
    if ((z > 4) && (x[0] === x[z]) && (y[0] === y[z])) {
      inGame = false;
    }
  }

  if (y[0] >= config.cAltura) {
    inGame = false;
  }

  if (y[0] < 0) {
    inGame = false;
  }

  if (x[0] >= config.cAmple) {
    inGame = false;
  }

  if (x[0] < 0) {
    inGame = false;
  }
}

/**
 * moure
 */
function moveStart() {
  for (let z = punts; z > 0; z--) {
    x[z] = x[(z - 1)];
    y[z] = y[(z - 1)];
  }

  if (esquerreDireccio) {
    x[0] -= config.puntMida;
  }

  if (dretaDireccio) {
    x[0] += config.puntMida;
  }

  if (amuntDireccio) {
    y[0] -= config.puntMida;
  }

  if (avallDireccio) {
    y[0] += config.puntMida;
  }
}

/**
 * drawing
 */
function drawing() {
  ctx.clearRect(0, 0, config.cAmple, config.cAltura);

  if (inGame) {
    ctx.drawImage(poma, pomaX, pomaY);

    for (let z = 0; z < punts; z++) {
      if (z === 0) {
        ctx.drawImage(head, x[z], y[z]);
      } else {
        ctx.drawImage(ball, x[z], y[z]);
      }
    }
  } else {
    finalJoc();
  }
}

/**
 * joc cicle
 */
function gameCycle() {
  if (inGame) {
    checkpoma();
    colisio();
    moveStart();
    drawing();
    setTimeout(gameCycle, config.RETARD);
  }
}

onkeydown = function(e) {
  const key = e.key;
  console.log(key);
  if ((key === config.KEYBOARD_KEYS['ESQUERRE_KEY']) && (!dretaDireccio)) {
    esquerreDireccio = true;
    amuntDireccio = false;
    avallDireccio = false;
  }
  if ((key === config.KEYBOARD_KEYS['DRETA_KEY']) && (!esquerreDireccio)) {
    dretaDireccio = true;
    amuntDireccio = false;
    avallDireccio = false;
    console.log('esquerreDireccio');
  }
  if ((key === config.KEYBOARD_KEYS['AMUNT_KEY']) && (!avallDireccio)) {
    amuntDireccio = true;
    dretaDireccio =
            false;
    esquerreDireccio = false;
  }
  if ((key === config.KEYBOARD_KEYS['AVALL_KEY']) && (!amuntDireccio)) {
    avallDireccio = true;
    dretaDireccio = false;
    esquerreDireccio = false;
  }
};
