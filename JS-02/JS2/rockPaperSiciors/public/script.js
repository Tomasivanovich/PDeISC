// Variables globales para el estado del juego
let modo = ""; // Guarda el modo de juego seleccionado: 'cpu' o 'versus'
let jugador1 = "", jugador2 = ""; // Nombres de los jugadores
let eleccion1 = "", eleccion2 = ""; // Jugadas actuales de cada jugador


function elegirModo(m) {
  try {
    modo = m; // Almacena el modo seleccionado

    // Oculta la pantalla de inicio
    document.getElementById("inicio").style.display = "none";
    // Muestra la pantalla del juego
    document.getElementById("juego").style.display = "block";

    const titulo = document.getElementById("tituloJuego"); // Elemento para el título dinámico
    const formJugador = document.getElementById("formJugador"); // Contenedor del formulario
    const seleccion = document.getElementById("seleccion"); // Zona de selección de jugada

    // Si se eligió jugar contra la CPU
    if (modo === "cpu") {
      titulo.innerText = "Jugador vs CPU"; // Cambia el título
      formJugador.innerHTML = `
        <input type="text" id="nombreJugador" placeholder="Tu nombre" required>
        <button onclick="iniciarVsCPU()">Comenzar</button>
      `; // Carga un formulario para ingresar el nombre
    } else {
      // Si se eligió modo dos jugadores con teclado
      titulo.innerText = "Jugador vs Jugador (teclado)";
      formJugador.innerHTML = `
        <input type="text" id="nombre1" placeholder="Jugador 1 (A/S/D)" required>
        <input type="text" id="nombre2" placeholder="Jugador 2 (K/L/Ñ)" required>
        <button onclick="iniciarTeclado()">Comenzar</button>
      `; // Formulario para ambos jugadores
    }

    cargarHistorial(); // Carga partidas anteriores desde el servidor
  } catch (error) {
    console.error("Error al elegir el modo de juego:", error); // Manejo de error
    alert("Ocurrió un error al iniciar el juego. Intenta de nuevo."); // Notificación al usuario
  }
}

/**
 * Inicia el modo de juego contra la CPU
 */
function iniciarVsCPU() {
  try {
    jugador1 = document.getElementById("nombreJugador").value; // Obtiene el nombre ingresado
    if (!jugador1) return alert("Ingresá tu nombre."); // Valida que haya nombre

    document.getElementById("formJugador").innerHTML = ""; // Limpia el formulario

    mostrarOpcionesJugadorCPU(); // Muestra los botones de jugadas
  } catch (error) {
    console.error("Error al iniciar el juego contra la CPU:", error);
    alert("Ocurrió un error. Reintentá más tarde.");
  }
}

/**
 * Muestra botones de selección para el jugador y genera una jugada aleatoria para la CPU
 */
function mostrarOpcionesJugadorCPU() {
  try {
    const seleccion = document.getElementById("seleccion"); // Zona donde se mostrarán opciones
    seleccion.innerHTML = `<p>${jugador1}, elegí tu jugada:</p>`; // Mensaje al jugador

    // Muestra botones con opciones, al hacer clic se ejecuta el callback
    mostrarBotones(opcion => {
      const cpu = ["Piedra", "Papel", "Tijeras"][Math.floor(Math.random() * 3)]; // Jugada aleatoria de CPU
      mostrarResultado(jugador1, opcion, "CPU", cpu); // Muestra el resultado
    });
  } catch (error) {
    console.error("Error al mostrar las opciones vs CPU:", error);
  }
}

function mostrarBotones(callback) {
  try {
    const opciones = ["Piedra", "Papel", "Tijeras"]; // Jugadas disponibles
    const seleccion = document.getElementById("seleccion"); // Zona de selección

    seleccion.innerHTML += `<div class="opciones"></div>`; // Crea un contenedor para los botones
    const contenedor = document.querySelector(".opciones");

    // Crea un botón por cada jugada
    opciones.forEach(opcion => {
      const btn = document.createElement("button"); // Crea botón
      btn.textContent = opcion; // Asigna texto al botón
      btn.onclick = () => callback(opcion); // Asocia el evento de clic
      contenedor.appendChild(btn); // Agrega botón al DOM
    });
  } catch (error) {
    console.error("Error al mostrar botones de opciones:", error);
  }
}


/**
 * Inicia el juego en modo teclado para dos jugadores
 */
function iniciarTeclado() {
  try {
    jugador1 = document.getElementById("nombre1").value; // Obtiene nombre del jugador 1
    jugador2 = document.getElementById("nombre2").value; // Obtiene nombre del jugador 2

    if (!jugador1 || !jugador2) return alert("Ingresá ambos nombres."); // Validación de campos

    document.getElementById("formJugador").innerHTML = ""; // Oculta el formulario
    eleccion1 = ""; // Reinicia jugada jugador 1
    eleccion2 = ""; // Reinicia jugada jugador 2

    const seleccion = document.getElementById("seleccion"); // Contenedor de instrucciones
    seleccion.innerHTML = `
      <p>Presionen sus teclas :</p>
      <p>${jugador1} → A (🏔) | S (📄) | D (✂️)</p>
      <p>${jugador2} → K (🏔) | L (📄) | Ñ (✂️)</p>
    `; // Instrucciones de teclas para ambos jugadores

    window.addEventListener("keydown", detectarTeclas); // Agrega evento para capturar teclas
  } catch (error) {
    console.error("Error al iniciar modo teclado:", error);
  }
}

/**
 * Escucha y registra las teclas presionadas por cada jugador
 */
function detectarTeclas(e) {
  try {
    const tecla = e.key.toLowerCase(); // Convierte a minúscula para evitar conflictos

    if (!eleccion1 && ["a", "s", "d"].includes(tecla)) {
      eleccion1 = convertirTecla(tecla); // Asigna jugada a jugador 1
    }

    if (!eleccion2 && ["k", "l", "ñ"].includes(tecla)) {
      eleccion2 = convertirTecla(tecla); // Asigna jugada a jugador 2
    }

    if (eleccion1 && eleccion2) {
      window.removeEventListener("keydown", detectarTeclas); // Evita múltiples ejecuciones
      mostrarResultado(jugador1, eleccion1, jugador2, eleccion2); // Muestra el resultado
    }
  } catch (error) {
    console.error("Error al detectar teclas:", error);
  }
}

/**
 * Convierte una tecla en una jugada válida
 */
function convertirTecla(tecla) {
  switch (tecla) {
    case "a":
    case "k":
      return "Piedra"; // Piedra para jugador 1 o 2
    case "s":
    case "l":
      return "Papel"; // Papel para jugador 1 o 2
    case "d":
    case "ñ":
      return "Tijeras"; // Tijeras para jugador 1 o 2
    default:
      return ""; // En caso de tecla no válida
  }
}

/**
 * Muestra el resultado de la partida y guarda los datos en el historial
 */
function mostrarResultado(j1, e1, j2, e2) {
  try {
    const resultado = calcularResultado(e1, e2); // Lógica de juego para determinar resultado
    const contenedor = document.getElementById("seleccion");
    contenedor.innerHTML = ""; // Limpia contenido anterior

    const resContainer = document.getElementById("resultadoJuego"); // Contenedor donde se muestra el resultado

    const ganador = resultado.includes(j1) ? j1 :
                    resultado.includes(j2) ? j2 : null; // Determina quién ganó

    // Función auxiliar para aplicar estilos CSS según ganador
    const getClass = (nombre) => {
      if (!ganador) return '';
      return nombre === ganador ? 'winner' : 'loser';
    };

    // Muestra animación del resultado y botón para reiniciar
    resContainer.innerHTML = `
      <div class="resultado-animado">
        <p class="${getClass(j1)}">${j1} eligió <strong>${e1}</strong></p>
        <p class="${getClass(j2)}">${j2} eligió <strong>${e2}</strong></p>
        <p><strong>${resultado}</strong></p>
        <br>
        <button onclick="elegirModo('${modo}')">Jugar otra vez</button>
      </div>
    `;

    // Envía la partida al backend para guardar en historial
    fetch('/guardar-partida', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jugador1: j1, eleccion1: e1, jugador2: j2, eleccion2: e2, resultado })
    }).then(cargarHistorial) // Recarga historial luego de guardar
      .catch(err => {
        console.error("Error al guardar partida:", err);
      });

  } catch (error) {
    console.error("Error al mostrar resultado:", error);
    alert("Hubo un problema al mostrar el resultado.");
  }
}

/**
 * Determina el resultado entre dos jugadas
 */
function calcularResultado(e1, e2) {
  if (e1 === e2) return "Empate"; // Si es la misma jugada, es empate

  if (
    (e1 === "Piedra" && e2 === "Tijeras") ||
    (e1 === "Papel" && e2 === "Piedra") ||
    (e1 === "Tijeras" && e2 === "Papel")
  ) return "Gana " + jugador1; // Jugador 1 gana

  return "Gana " + jugador2; // Jugador 2 gana si no gana el 1
}

/**
 * Obtiene el historial de partidas desde el servidor
 */
function cargarHistorial() {
  try {
    fetch("/historial") // Solicitud al backend
      .then(res => res.json()) // Convierte la respuesta a JSON
      .then(data => {
        const historial = document.getElementById("historial"); // Contenedor de historial

        // Crea elementos <li> con los datos de cada partida
        historial.innerHTML = data.map(p =>
          `<li>${p.jugador1} (${p.eleccion1}) vs ${p.jugador2} (${p.eleccion2}) → ${p.resultado}</li>`
        ).join(""); // Une todos los <li> como HTML
      }).catch(error => {
        console.error("Error al obtener historial:", error);
      });
  } catch (error) {
    console.error("Error general en cargarHistorial:", error);
  }
}

