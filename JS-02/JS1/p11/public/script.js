// Arrays para almacenar datos
let arrayNumeros = [];
let arrayPalabras = [];
let arrayUsuarios = [];

/**
 * Muestra el array de números en el contenedor correspondiente
 */
function mostrarArrayNumeros() {
  try {
    document.getElementById('arrayNumeros').textContent = `[${arrayNumeros.join(', ')}]`;
  } catch (error) {
    console.error('Error mostrando arrayNumeros:', error);
  }
}

/**
 * Muestra el array de palabras en el contenedor correspondiente
 */
function mostrarArrayPalabras() {
  try {
    document.getElementById('arrayPalabras').textContent = `[${arrayPalabras.join(', ')}]`;
  } catch (error) {
    console.error('Error mostrando arrayPalabras:', error);
  }
}

/**
 * Muestra el array de usuarios en formato {nombre, activo}
 */
function mostrarArrayUsuarios() {
  try {
    const cont = document.getElementById('arrayUsuarios');
    if (arrayUsuarios.length === 0) {
      cont.textContent = '[ ]';
      return;
    }
    cont.textContent = arrayUsuarios
      .map(u => `{nombre: ${u.nombre}, activo: ${u.activo}}`)
      .join(', ');
  } catch (error) {
    console.error('Error mostrando arrayUsuarios:', error);
  }
}

// Evento para agregar número al arrayNumeros
document.getElementById('btnAgregarNumero').addEventListener('click', () => {
  try {
    const input = document.getElementById('inputNumero');
    const valor = input.value.trim();
    if (!valor) throw new Error('Ingrese un número válido');

    const num = Number(valor);
    if (isNaN(num)) throw new Error('Ingrese un número válido');

    arrayNumeros.push(num);
    mostrarArrayNumeros();
    input.value = '';
  } catch (error) {
    alert(error.message);
  }
});

// Evento para agregar palabra al arrayPalabras
document.getElementById('btnAgregarPalabra').addEventListener('click', () => {
  try {
    const input = document.getElementById('inputPalabra');
    const palabra = input.value.trim();
    if (!palabra) throw new Error('Ingrese una palabra válida');

    arrayPalabras.push(palabra);
    mostrarArrayPalabras();
    input.value = '';
  } catch (error) {
    alert(error.message);
  }
});

// Evento para agregar usuario {nombre, activo} al arrayUsuarios
document.getElementById('btnAgregarUsuario').addEventListener('click', () => {
  try {
    const nombre = document.getElementById('inputUsuarioNombre').value.trim();
    const activoStr = document.getElementById('inputUsuarioActivo').value;
    if (!nombre) throw new Error('Ingrese un nombre válido');

    // Convertimos string "true"/"false" a boolean
    const activo = activoStr === 'true';

    arrayUsuarios.push({ nombre, activo });
    mostrarArrayUsuarios();

    document.getElementById('inputUsuarioNombre').value = '';
  } catch (error) {
    alert(error.message);
  }
});

// Filtrar números mayores a 10
document.getElementById('btnFiltrarNumeros').addEventListener('click', () => {
  try {
    const cont = document.getElementById('resultadoNumeros');
    if (arrayNumeros.length === 0) {
      cont.textContent = 'No hay números para filtrar.';
      return;
    }
    const filtrados = arrayNumeros.filter(n => n > 10);
    cont.textContent = `Números mayores a 10: [${filtrados.join(', ')}]`;
  } catch (error) {
    console.error('Error filtrando números:', error);
  }
});

// Filtrar palabras con más de 5 letras
document.getElementById('btnFiltrarPalabras').addEventListener('click', () => {
  try {
    const cont = document.getElementById('resultadoPalabras');
    if (arrayPalabras.length === 0) {
      cont.textContent = 'No hay palabras para filtrar.';
      return;
    }
    const filtradas = arrayPalabras.filter(p => p.length > 5);
    cont.textContent = `Palabras con más de 5 letras: [${filtradas.join(', ')}]`;
  } catch (error) {
    console.error('Error filtrando palabras:', error);
  }
});

// Filtrar usuarios activos
document.getElementById('btnFiltrarUsuarios').addEventListener('click', () => {
  try {
    const cont = document.getElementById('resultadoUsuarios');
    if (arrayUsuarios.length === 0) {
      cont.textContent = 'No hay usuarios para filtrar.';
      return;
    }
    const activos = arrayUsuarios.filter(u => u.activo);
    if (activos.length === 0) {
      cont.textContent = 'No hay usuarios activos.';
      return;
    }
    cont.textContent = activos.map(u => u.nombre).join(', ');
  } catch (error) {
    console.error('Error filtrando usuarios activos:', error);
  }
});

// Mostrar arrays iniciales al cargar la página
mostrarArrayNumeros();
mostrarArrayPalabras();
mostrarArrayUsuarios();
