// Arrays para almacenar números, palabras y personas
let arrayNumeros = [];
let arrayPalabras = [];
let arrayPersonas = [];

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
 * Muestra el array de personas en el contenedor correspondiente
 * Formato: {nombre: ..., edad: ...}
 */
function mostrarArrayPersonas() {
  try {
    const cont = document.getElementById('arrayPersonas');
    if (arrayPersonas.length === 0) {
      cont.textContent = '[ ]';
      return;
    }
    cont.textContent = arrayPersonas
      .map(p => `{nombre: ${p.nombre}, edad: ${p.edad}}`)
      .join(', ');
  } catch (error) {
    console.error('Error mostrando arrayPersonas:', error);
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

// Evento para agregar persona {nombre, edad} al arrayPersonas
document.getElementById('btnAgregarPersona').addEventListener('click', () => {
  try {
    const nombre = document.getElementById('inputNombre').value.trim();
    const edadStr = document.getElementById('inputEdad').value.trim();
    if (!nombre) throw new Error('Ingrese un nombre válido');
    if (!edadStr) throw new Error('Ingrese una edad válida');

    const edad = Number(edadStr);
    if (isNaN(edad) || edad < 0) throw new Error('Ingrese una edad válida');

    arrayPersonas.push({ nombre, edad });
    mostrarArrayPersonas();

    // Limpiar inputs
    document.getElementById('inputNombre').value = '';
    document.getElementById('inputEdad').value = '';
  } catch (error) {
    alert(error.message);
  }
});

// 1. Ordenar números de menor a mayor
document.getElementById('btnOrdenarNumeros').addEventListener('click', () => {
  try {
    const cont = document.getElementById('resultadoNumeros');
    if (arrayNumeros.length === 0) {
      cont.textContent = 'No hay números para ordenar.';
      return;
    }
    // No modificar el array original
    const ordenados = [...arrayNumeros].sort((a, b) => a - b);
    cont.textContent = `Números ordenados: [${ordenados.join(', ')}]`;
  } catch (error) {
    console.error('Error ordenando números:', error);
  }
});

// 2. Ordenar palabras alfabéticamente
document.getElementById('btnOrdenarPalabras').addEventListener('click', () => {
  try {
    const cont = document.getElementById('resultadoPalabras');
    if (arrayPalabras.length === 0) {
      cont.textContent = 'No hay palabras para ordenar.';
      return;
    }
    const ordenadas = [...arrayPalabras].sort((a, b) => a.localeCompare(b));
    cont.textContent = `Palabras ordenadas: [${ordenadas.join(', ')}]`;
  } catch (error) {
    console.error('Error ordenando palabras:', error);
  }
});

// 3. Ordenar personas por edad
document.getElementById('btnOrdenarPersonas').addEventListener('click', () => {
  try {
    const cont = document.getElementById('resultadoPersonas');
    if (arrayPersonas.length === 0) {
      cont.textContent = 'No hay personas para ordenar.';
      return;
    }
    const ordenadas = [...arrayPersonas].sort((a, b) => a.edad - b.edad);
    cont.textContent = ordenadas
      .map(p => `${p.nombre} (${p.edad})`)
      .join(', ');
  } catch (error) {
    console.error('Error ordenando personas:', error);
  }
});

// Mostrar arrays al cargar la página
mostrarArrayNumeros();
mostrarArrayPalabras();
mostrarArrayPersonas();
