// Arrays para almacenar colores, tareas y usuarios
let colores = [];
let tareas = [];
let usuarios = ["Felipe", "Joaquin"]; // Usuarios iniciales para demostrar que el input tiene prioridad

try {
  // Referencias a elementos del DOM para colores
  const colorForm = document.getElementById('colorForm');
  const colorInput = document.getElementById('colorInput');
  const mensajeColor = document.getElementById('mensajeColor');
  const listaColores = document.getElementById('listaColores');

  // Referencias a elementos del DOM para tareas
  const tareaForm = document.getElementById('tareaForm');
  const tareaInput = document.getElementById('tareaInput');
  const mensajeTarea = document.getElementById('mensajeTarea');
  const listaTareas = document.getElementById('listaTareas');

  // Checkbox para marcar tarea crítica (asumo que existe en HTML)
  const tareaCriticaCheckbox = document.getElementById('tareaCriticaCheckbox');

  // Referencias a elementos del DOM para usuarios
  const usuarioForm = document.getElementById('usuarioForm');
  const usuarioInput = document.getElementById('usuarioInput');
  const mensajeUsuario = document.getElementById('mensajeUsuario');
  const listaUsuarios = document.getElementById('listaUsuarios');

  // Función para actualizar la lista de colores
  function actualizarListaColores() {
    listaColores.innerHTML = '';
    colores.forEach(color => {
      const li = document.createElement('li');
      li.textContent = color;
      listaColores.appendChild(li);
    });
  }

  // Función para actualizar la lista de tareas
  function actualizarListaTareas() {
    listaTareas.innerHTML = '';
    tareas.forEach(tarea => {
      const li = document.createElement('li');
      li.textContent = tarea;
      listaTareas.appendChild(li);
    });
  }

  // Función para actualizar la lista de usuarios
  function actualizarListaUsuarios() {
    listaUsuarios.innerHTML = '';
    usuarios.forEach(usuario => {
      const li = document.createElement('li');
      li.textContent = usuario;
      listaUsuarios.appendChild(li);
    });
  }

  // Manejo del formulario de colores
  colorForm.addEventListener('submit', function(e) {
    e.preventDefault();
    try {
      const color = colorInput.value.trim();
      if (!color) throw new Error('Por favor ingrese un color válido.');

      // Agregar color al inicio del array
      colores.unshift(color);

      // Limpiar input y actualizar lista
      colorInput.value = '';
      actualizarListaColores();

      // Mensaje de éxito
      mensajeColor.textContent = 'Color agregado correctamente.';
    } catch (err) {
      mensajeColor.textContent = err.message;
    }
  });

  // Manejo del formulario de tareas
  tareaForm.addEventListener('submit', function(e) {
    e.preventDefault();
    try {
      const tarea = tareaInput.value.trim();
      if (!tarea) throw new Error('Por favor ingrese una tarea válida.');

      // Si está marcada la tarea crítica, agregar al inicio
      if (tareaCriticaCheckbox && tareaCriticaCheckbox.checked) {
        tareas.unshift(tarea);
        mensajeTarea.textContent = 'Tarea crítica agregada correctamente.';
      } else {
        // Sino, agregar al final
        tareas.push(tarea);
        mensajeTarea.textContent = 'Tarea agregada correctamente.';
      }

      // Limpiar input y actualizar lista
      tareaInput.value = '';
      actualizarListaTareas();

    } catch (err) {
      mensajeTarea.textContent = err.message;
    }
  });

  // Manejo del formulario de usuarios
  usuarioForm.addEventListener('submit', function(e) {
    e.preventDefault();
    try {
      const usuario = usuarioInput.value.trim();
      if (!usuario) throw new Error('Por favor ingrese un usuario válido.');

      // Agregar usuario al inicio del array
      usuarios.unshift(usuario);

      // Limpiar input y actualizar lista
      usuarioInput.value = '';
      actualizarListaUsuarios();

      // Mensaje de éxito
      mensajeUsuario.textContent = 'Usuario agregado correctamente.';
    } catch (err) {
      mensajeUsuario.textContent = err.message;
    }
  });

} catch (err) {
  // Error general de inicialización
  console.error("Error al inicializar la aplicación:", err);
  alert("Error crítico en la aplicación. Revisa la consola.");
}
