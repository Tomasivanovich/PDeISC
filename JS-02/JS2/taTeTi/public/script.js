// ======== Elementos del DOM ========
const formNombres = document.getElementById('formNombres'); // Formulario donde se ingresan los nombres de los jugadores
const jugador1Input = document.getElementById('jugador1'); // Input para el nombre del Jugador 1
const jugador2Input = document.getElementById('jugador2'); // Input para el nombre del Jugador 2
const chkCpu = document.getElementById('chkCpu'); // Checkbox para seleccionar si el jugador 2 es la CPU
const info = document.getElementById('info'); // Elemento que muestra el turno actual
const tablero = document.getElementById('tablero'); // Contenedor del tablero del juego
const resultado = document.getElementById('resultado'); // Muestra el resultado (ganador o empate)
const reiniciarBtn = document.getElementById('reiniciar'); // Botón para reiniciar el juego
const historialEl = document.getElementById('historial'); // Lista donde se mostrará el historial de partidas

// ======== Variables de estado ========
let tableroArray = Array(9).fill(null); // Arreglo que representa el estado del tablero (9 celdas vacías)
let turno = 'X'; // Turno actual ('X' o 'O')
let jugando = false; // Indica si el juego está activo
let vsCpu = false; // Indica si se juega contra la CPU

// ======== Evento: Inicio del juego al enviar el formulario ========
formNombres.addEventListener('submit', e => {
  e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar página)

  // Validación: nombre del jugador 1 obligatorio
  if (!jugador1Input.value.trim()) {
    alert('Ingrese nombre del jugador 1');
    return;
  }

  // Validación: si no juega contra CPU, nombre del jugador 2 también obligatorio
  if (!chkCpu.checked && !jugador2Input.value.trim()) {
    alert('Ingrese nombre del jugador 2');
    return;
  }

  // Define si el modo es contra CPU (basado en el checkbox)
  vsCpu = chkCpu.checked;

  // Si se juega contra CPU, se asigna "CPU" como nombre del jugador 2 y se desactiva el input
  if (vsCpu) {
    jugador2Input.value = 'CPU';
    jugador2Input.disabled = true;
  } else {
    jugador2Input.disabled = false;
  }

  // Llama a la función que inicia el juego
  iniciarJuego();
});

// ======== Evento: Alternar modo contra CPU ========
chkCpu.addEventListener('change', () => {
  if (chkCpu.checked) {
    jugador2Input.style.display = 'none'; // Oculta input si se juega contra CPU
    jugador2Input.value = 'CPU'; // Asigna el valor "CPU"
  } else {
    jugador2Input.style.display = 'inline-block'; // Muestra el input
    jugador2Input.value = ''; // Limpia el valor
    jugador2Input.disabled = false; // Habilita el input
  }
});

// ======== Función: Iniciar o reiniciar el juego ========
function iniciarJuego() {
  jugando = true; // Habilita la jugabilidad
  tableroArray.fill(null); // Limpia el arreglo del tablero
  turno = 'X'; // Reinicia el turno a 'X'
  resultado.textContent = ''; // Limpia el resultado
  info.textContent = `Turno de ${turno === 'X' ? jugador1Input.value : jugador2Input.value}`; // Muestra de quién es el turno
  tablero.innerHTML = ''; // Limpia el tablero visual
  reiniciarBtn.style.display = 'none'; // Oculta el botón de reiniciar

  // Crea las 9 celdas y les asigna eventos
  for (let i = 0; i < 9; i++) {
    const celda = document.createElement('div');
    celda.classList.add('celda'); // Clase CSS para estilo
    celda.dataset.index = i; // Se almacena el índice de la celda
    celda.addEventListener('click', manejarClickCelda); // Evento click
    tablero.appendChild(celda); // Agrega la celda al tablero
  }
}

// ======== Función: Manejar el click en una celda ========
function manejarClickCelda(e) {
  if (!jugando) return; // Ignora clicks si el juego está inactivo

  const index = e.target.dataset.index; // Índice de la celda clickeada
  if (tableroArray[index]) return; // Si la celda ya está ocupada, no hacer nada

  marcarCelda(index, turno); // Marca la celda con el símbolo actual

  if (verificarGanador()) { // Verifica si hay un ganador
    terminarJuego(`${turno === 'X' ? jugador1Input.value : jugador2Input.value} ganó!`);
    return;
  }

  if (tableroArray.every(c => c)) { // Verifica si hay empate (todas las celdas llenas)
    terminarJuego('Empate!');
    return;
  }

  cambiarTurno(); // Cambia el turno

  // Si el modo es contra CPU y ahora es su turno, hace una jugada luego de un pequeño retardo
  if (vsCpu && turno === 'O') {
    setTimeout(jugadaCpu, 600); // La CPU juega tras 600ms
  }
}

// ======== Función: Marcar una celda ========
function marcarCelda(index, jugador) {
  tableroArray[index] = jugador; // Guarda el símbolo en el arreglo
  const celda = tablero.querySelector(`[data-index="${index}"]`);
  celda.textContent = jugador; // Muestra el símbolo en la interfaz
}

// ======== Función: Cambiar turno ========
function cambiarTurno() {
  turno = turno === 'X' ? 'O' : 'X'; // Alterna entre X y O
  info.textContent = `Turno de ${turno === 'X' ? jugador1Input.value : jugador2Input.value}`; // Muestra de quién es el turno
}

// ======== Función: Jugada de la CPU (aleatoria) ========
function jugadaCpu() {
  // Encuentra las celdas vacías
  const vacias = tableroArray
    .map((v, i) => (v === null ? i : null))
    .filter(i => i !== null);

  if (vacias.length === 0) return; // Si no hay espacios vacíos, no hacer nada

  const eleccion = vacias[Math.floor(Math.random() * vacias.length)]; // Elige una posición aleatoria
  marcarCelda(eleccion, 'O'); // Marca la celda como jugada de la CPU

  if (verificarGanador()) {
    terminarJuego(`${jugador2Input.value} ganó!`);
    return;
  }

  if (tableroArray.every(c => c)) {
    terminarJuego('Empate!');
    return;
  }

  cambiarTurno(); // Continúa el juego si no terminó
}

// ======== Función: Verifica si hay un ganador ========
function verificarGanador() {
  const combinaciones = [
  [0,1,2], // Fila superior: celdas 0, 1 y 2
  [3,4,5], // Fila del medio: celdas 3, 4 y 5
  [6,7,8], // Fila inferior: celdas 6, 7 y 8

  [0,3,6], // Columna izquierda: celdas 0, 3 y 6
  [1,4,7], // Columna del medio: celdas 1, 4 y 7
  [2,5,8], // Columna derecha: celdas 2, 5 y 8

  [0,4,8], // Diagonal principal: de arriba izquierda a abajo derecha
  [2,4,6]  // Diagonal secundaria: de arriba derecha a abajo izquierda
  ];

  // Recorre cada combinación ganadora posible
  return combinaciones.some(indices => {
  const [a, b, c] = indices;
  return (
    tableroArray[a] &&                                // Verifica que haya algo marcado en la celda 'a'
    tableroArray[a] === tableroArray[b] &&            // Verifica que 'a' y 'b' sean iguales
    tableroArray[a] === tableroArray[c]               // Verifica que 'a' y 'c' también sean iguales
  );
  });

}

// ======== Función: Terminar el juego ========
function terminarJuego(mensaje) {
  jugando = false; // Desactiva el estado de juego
  resultado.textContent = mensaje; // Muestra el resultado
  reiniciarBtn.style.display = 'inline-block'; // Muestra el botón para reiniciar
  guardarHistorial(mensaje); // Guarda el resultado en el historial
}

// ======== Evento: Reiniciar el juego desde botón ========
reiniciarBtn.addEventListener('click', () => {
  iniciarJuego(); // Reinicia el juego completamente
});

// ======== Función: Guardar partida actual en servidor ========
function guardarHistorial(ganador) {
  // Crea un objeto con los datos de la partida actual
  const partida = {
    jugador1: jugador1Input.value, // Nombre del jugador 1 (tomado del input del formulario)
    jugador2: jugador2Input.value, // Nombre del jugador 2 (puede ser otro jugador o "CPU")
    ganador                         // Nombre del jugador que ganó (pasado como argumento a la función)
  };

  // Realiza una solicitud HTTP POST al servidor para guardar la partida
  fetch('/guardar-partida', {
    method: 'POST', // Método HTTP usado para enviar datos al servidor
    headers: { 'Content-Type': 'application/json' }, // Indica que el contenido enviado es JSON
    body: JSON.stringify(partida) // Convierte el objeto 'partida' a una cadena JSON para enviarla
  })
  .then(() => cargarHistorial()); // Una vez guardado, llama a la función que recarga el historial desde el servidor
}

// ======== Función: Cargar historial desde servidor ========
function cargarHistorial() {
  fetch('/historial') // Solicita los datos al servidor
    .then(res => res.json()) // Convierte la respuesta a JSON
    .then(data => {
      // Muestra cada partida en una lista
      historialEl.innerHTML = data.map(p =>
        `<li>${p.jugador1} vs ${p.jugador2} → <strong>${p.ganador}</strong></li>`
      ).join('');
    });
}

// ======== Al cargar la página, carga el historial automáticamente ========
cargarHistorial();
