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

  
  function manejarChange() {
    const opcionesSelect = document.getElementById('opcionesSelect');
    const opcionSeleccionada = document.getElementById('opcionSeleccionada');
  
    if (opcionesSelect && opcionSeleccionada) {
      opcionSeleccionada.textContent = `Has seleccionado: ${opcionesSelect.value}`;
    }
  }
 
  // Función para el evento Submit
  function manejarSubmit(event) {
    event.preventDefault(); // prevenir recarga de la página
    const nombre = document.getElementById('nombre').value;
    document.getElementById('mensaje').textContent = `¡Hola, ${nombre}!`;
  }

  // Ejecutar la función que inicializa todos los eventos cuando el documento está listo
  document.addEventListener('DOMContentLoaded', iniciarEventos);
  