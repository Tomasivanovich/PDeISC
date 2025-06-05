// Colores disponibles para la secuencia
const colors = ['green', 'red', 'yellow', 'blue'];

// Variables del estado del juego
let sequence = []; // Secuencia generada por el juego
let playerSequence = []; // Secuencia que el jugador va reproduciendo
let level = 0; // Nivel actual del juego
let playerName = ""; // Nombre del jugador ingresado
let gameOver = false; // Bool que indica si el juego ha terminado

// Asocia cada color con su botón correspondiente en el DOM
const buttons = {
  green: document.getElementById('green'),
  red: document.getElementById('red'),
  yellow: document.getElementById('yellow'),
  blue: document.getElementById('blue')
};

// Botón de inicio/reinicio del juego
const startBtn = document.getElementById('start');

// Agrega listener al formulario para guardar el nombre del jugador
document.getElementById('nameForm').addEventListener('submit', saveName);

// Listener para el botón de inicio
startBtn.addEventListener('click', () => {
  if (gameOver) {
    // Si el juego ha terminado, permite reiniciarlo
    startGame();
  } else {
    // También inicia si aún no ha empezado
    startGame();
  }
});

// Agrega un listener a cada botón de color
Object.keys(buttons).forEach(color => {
  buttons[color].addEventListener('click', () => {
    if (!gameOver) { // Solo acepta clics si el juego está activo
      handleUserInput(color); // Procesa la jugada del jugador
    }
  });
});

/**
 * Función que guarda el nombre del jugador desde el formulario
 */
function saveName(e) {
  e.preventDefault(); // Previene el comportamiento por defecto del form
  const input = document.getElementById('playerName'); // Input del nombre
  playerName = input.value.trim(); // Guarda el nombre sin espacios extra

  if (playerName) {
    document.getElementById('playerInfo').style.display = 'none'; // Oculta el formulario
    startBtn.style.display = 'inline-block'; // Muestra botón de inicio
    document.getElementById('welcome').innerText = `¡Buena suerte, ${playerName}!`; // Mensaje personalizado
  }
}

/**
 * Función para iniciar o reiniciar el juego
 */
function startGame() {
  level = 0; // Reinicia el nivel
  sequence = []; // Borra secuencia anterior
  playerSequence = []; // Limpia la secuencia del jugador
  gameOver = false; // Marca el juego como activo

  startBtn.innerText = 'Iniciar Juego'; // Cambia texto del botón
  startBtn.style.display = 'none'; // Oculta el botón mientras se juega

  nextRound(); // Comienza la primera ronda
}

/**
 * Función que avanza al siguiente nivel
 */
function nextRound() {
  level++; // Aumenta el nivel
  document.getElementById('level').innerText = `Nivel ${level}`; // Muestra nivel actual
  playerSequence = []; // Limpia la secuencia del jugador para la nueva ronda

  // Agrega un nuevo color aleatorio a la secuencia
  sequence.push(colors[Math.floor(Math.random() * colors.length)]);

  playSequence(); // Reproduce visualmente la secuencia
}

/**
 * Reproduce la secuencia generada por el juego con efectos visuales
 */
function playSequence() {
  let i = 0; // Índice de la secuencia, empieza en 0 para recorrerla desde el inicio

  // Crea un temporizador que ejecuta una función cada 700 milisegundos
  const interval = setInterval(() => {
    
    flashButton(sequence[i]); // Llama a la función que ilumina el botón correspondiente al color actual

    i++; // Avanza al siguiente color de la secuencia

    // Si ya se mostró todo el arreglo (llegamos al final de la secuencia)
    if (i >= sequence.length) clearInterval(interval); // Detiene el temporizador para que no siga ejecutando
  }, 700); // Intervalo de tiempo entre la activación de cada color (0.7 segundos)
}


/**
 * Agrega y quita la clase visual 'flash' para animar un botón
 */
function flashButton(color) {
  const btn = buttons[color]; // Obtiene el botón según el color
  btn.classList.add('flash'); // Agrega clase para efecto visual
  setTimeout(() => btn.classList.remove('flash'), 300); // La quita después de 300ms
}

/**
 * Maneja la jugada del jugador y verifica si es correcta
 */
function handleUserInput(color) {
  playerSequence.push(color); // Agrega la jugada a la secuencia del jugador
  flashButton(color); // Muestra efecto visual del botón presionado

  const i = playerSequence.length - 1; // Última posición jugada
  if (playerSequence[i] !== sequence[i]) {
    endGame(); // Si la jugada es incorrecta, termina el juego
    return;
  }

  // Si el jugador completó correctamente toda la secuencia
  if (playerSequence.length === sequence.length) {
    setTimeout(nextRound, 1000); // Avanza al siguiente nivel tras 1 segundo
  }
}

/**
 * Finaliza el juego y muestra resultado al jugador
 */
function endGame() {
  gameOver = true; // Marca el juego como terminado
  alert(`¡Perdiste, ${playerName}! Llegaste al nivel ${level}.`); // Muestra alerta con el nivel alcanzado

  startBtn.innerText = 'Reiniciar Juego'; // Cambia el botón para reiniciar
  startBtn.style.display = 'inline-block'; // Muestra el botón

  saveScore(); // Guarda el puntaje en el servidor
}

/**
 * Guarda el puntaje del jugador en el servidor mediante POST
 */
function saveScore() {
  // Realiza una solicitud HTTP al servidor para guardar el puntaje
  fetch('/guardar-puntaje', {
    
    method: 'POST', // Usa el método POST porque vamos a enviar datos (crear o guardar algo)

    headers: { 
      'Content-Type': 'application/json' // Indicamos que el cuerpo del mensaje estará en formato JSON
    },

    body: JSON.stringify({ 
      name: playerName,   // Nombre del jugador (variable global guardada previamente)
      score: level        // Nivel alcanzado por el jugador (puntaje)
    }) // Convierte el objeto JS a un string JSON para enviarlo al backend
  })

  // Cuando el servidor responde (y si todo fue bien), ejecuta la función para recargar el ranking
  .then(loadScores); // Esto actualiza el listado de puntajes mostrados en pantalla
}

/**
 * Carga los puntajes guardados y los muestra en una lista
 */
function loadScores() {
  fetch('/puntajes') // Solicita el ranking desde el servidor
    .then(res => res.json()) // Convierte la respuesta a JSON
    .then(data => {
      const tabla = document.getElementById('ranking'); // Contenedor de la lista de puntajes

      // Genera una lista HTML con cada jugador y su nivel alcanzado
      tabla.innerHTML = data.map(p => `<li>${p.name} - Nivel ${p.score}</li>`).join('');
    });
}

// Carga el ranking automáticamente al cargar la página
window.onload = loadScores;
