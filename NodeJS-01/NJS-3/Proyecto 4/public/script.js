// Lista inicial de enlaces
const enlaces = [
  { text: "Google", href: "https://www.google.com" },
  { text: "YouTube", href: "https://www.youtube.com" },
  { text: "Wikipedia", href: "https://www.wikipedia.org" },
  { text: "MDN", href: "https://developer.mozilla.org" },
  { text: "GitHub", href: "https://github.com" }
];

// Lista con nuevos datos para modificar los enlaces existentes
const nuevosDatos = [
  { text: "DuckDuckGo", href: "https://duckduckgo.com" },
  { text: "Vimeo", href: "https://vimeo.com" },
  { text: "Wikipedia ES", href: "https://es.wikipedia.org" },
  { text: "W3Schools", href: "https://w3schools.com" },
  { text: "GitLab", href: "https://gitlab.com" }
];

// Referencias a elementos del DOM
const container = document.getElementById("links-container");
const log = document.getElementById("log");

// Eventos al hacer clic en los botones
document.getElementById("crear-enlaces").addEventListener("click", crearEnlaces);
document.getElementById("modificar-enlaces").addEventListener("click", modificarEnlaces);

// Función que crea los enlaces en el DOM
function crearEnlaces() {
  // Limpiar el contenedor
  container.innerHTML = "";

  // Recorrer el array de enlaces y crear elementos <a>
  enlaces.forEach((enlace, i) => {
    const a = document.createElement("a");
    a.textContent = enlace.text;     // Texto del enlace
    a.href = enlace.href;            // Dirección del enlace
    a.target = "_blank";             // Abrir en nueva pestaña
    a.dataset.index = i;             // Guardar índice como atributo de datos
    container.appendChild(a);        // Agregar al contenedor
  });

  // Agregar mensaje al log
  log.innerHTML += "Enlaces creados.<br/>";
}

// Función que modifica los enlaces existentes con nuevos datos
function modificarEnlaces() {
  // Obtener todos los enlaces creados
  const anchors = container.querySelectorAll("a");

  // Recorrer los enlaces y aplicar nuevas propiedades
  anchors.forEach((a, i) => {
    const anteriorHref = a.href;
    const anteriorTexto = a.textContent;

    // Reemplazar href y texto por nuevos datos
    a.href = nuevosDatos[i].href;
    a.textContent = nuevosDatos[i].text;

    // Agregar mensaje al log con los cambios realizados
    log.innerHTML += `Enlace modificado:<br/>
      &nbsp;&nbsp;<strong>Texto</strong>: <code>${anteriorTexto}</code> --> <code>${a.textContent}</code><br/>
      &nbsp;&nbsp;<strong>Href</strong>: <code>${anteriorHref}</code> --> <code>${a.href}</code><br/>`;
  });
}
