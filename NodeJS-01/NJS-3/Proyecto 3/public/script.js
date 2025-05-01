// Función para el evento Click
function manejarClick() {
     document.getElementById('texto').textContent = '¡Texto cambiado!';
  }
  
  // Función para el evento Mouseover
  function manejarMouseover() {
    const textoHover = document.getElementById('textoHover');
    const h1 = document.getElementById('contenedor');
    
    textoHover.addEventListener('mouseover', function() {
      this.style.color = 'red';
      h1.textContent = '¡Texto cambiado al pasar el mouse!';
    });
  
    textoHover.addEventListener('mouseout', function() {
      this.style.color = 'black';
      h1.textContent = ''
    });
  }
  

  function manejarChange() {
    const opcionesSelect = document.getElementById('opcionesSelect');
    const opcionSeleccionada = document.getElementById('opcionSeleccionada');
  
    if (opcionesSelect && opcionSeleccionada) {
      opcionSeleccionada.textContent = `Has seleccionado: ${opcionesSelect.value}`;
    }
  }

// Función para el evento Keypress
function manejarKeypress() {
  // Escuchar el evento keypress en todo el documento
  document.addEventListener('keypress', function(event) {
    // Mostrar la tecla presionada en el elemento con id 'teclaPresionada'
    document.getElementById('teclaPresionada').textContent = `Tecla presionada: ${event.key}`;
  });
}

// Ejecutar la función cuando el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', manejarKeypress);

  // Función para el evento Submit
  function manejarSubmit(event) {
    event.preventDefault(); // prevenir recarga de la página
    const nombre = document.getElementById('nombre').value;
    document.getElementById('mensaje').textContent = `¡Hola, ${nombre}!`;
  }

  // Función para contar los hijos de un elemento específico
function contarHijos() {
  const contenedor = document.getElementById('contenedor');
  const resultado = document.getElementById('resultado');
  
  // Contamos los elementos hijos directos del contenedor
  const hijos = contenedor.children.length;

  // Mostramos el número de hijos en el párrafo
  resultado.textContent = `El contenedor de los botones tiene ${hijos} hijo(s).`;
}

// Asignamos el evento de pulsado al botón
document.getElementById('contarHijosBtn').addEventListener('click', contarHijos);

