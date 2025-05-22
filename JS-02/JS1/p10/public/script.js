// Arrays para almacenar diferentes tipos de datos
let arrayNumeros = [];
let arrayNombres = [];
let arrayPrecios = [];

/**
 * Función genérica para mostrar un array en un contenedor HTML dado
 * @param {Array} array - Array a mostrar
 * @param {string} idContenedor - ID del contenedor donde se mostrará
 */
function mostrarArray(array, idContenedor) {
  try {
    document.getElementById(idContenedor).textContent = `[${array.join(', ')}]`;
  } catch (error) {
    console.error(`Error mostrando array en ${idContenedor}:`, error);
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
    mostrarArray(arrayNumeros, 'arrayNumeros');
    input.value = '';
  } catch (error) {
    alert(error.message);
  }
});

// Evento para agregar nombre al arrayNombres
document.getElementById('btnAgregarNombre').addEventListener('click', () => {
  try {
    const input = document.getElementById('inputNombre');
    const nombre = input.value.trim();
    if (!nombre) throw new Error('Ingrese un nombre válido');

    arrayNombres.push(nombre);
    mostrarArray(arrayNombres, 'arrayNombres');
    input.value = '';
  } catch (error) {
    alert(error.message);
  }
});

// Evento para agregar precio al arrayPrecios
document.getElementById('btnAgregarPrecio').addEventListener('click', () => {
  try {
    const input = document.getElementById('inputPrecio');
    const valor = input.value.trim();
    if (!valor) throw new Error('Ingrese un precio válido');

    const num = Number(valor);
    if (isNaN(num)) throw new Error('Ingrese un precio válido');

    arrayPrecios.push(num);
    mostrarArray(arrayPrecios, 'arrayPrecios');
    input.value = '';
  } catch (error) {
    alert(error.message);
  }
});

// Multiplicar cada número por 3 y mostrar resultado
document.getElementById('btnMultiplicar').addEventListener('click', () => {
  try {
    const cont = document.getElementById('resultadoMultiplicar');
    if (arrayNumeros.length === 0) {
      cont.textContent = 'No hay números para multiplicar.';
      return;
    }
    const multiplicados = arrayNumeros.map(n => n * 3);
    cont.textContent = `Números multiplicados por 3: [${multiplicados.join(', ')}]`;
  } catch (error) {
    console.error('Error al multiplicar números:', error);
  }
});

// Convertir nombres a mayúsculas y mostrar resultado
document.getElementById('btnMayusculas').addEventListener('click', () => {
  try {
    const cont = document.getElementById('resultadoMayusculas');
    if (arrayNombres.length === 0) {
      cont.textContent = 'No hay nombres para convertir.';
      return;
    }
    const mayusculas = arrayNombres.map(n => n.toUpperCase());
    cont.textContent = `Nombres en mayúsculas: [${mayusculas.join(', ')}]`;
  } catch (error) {
    console.error('Error al convertir nombres:', error);
  }
});

// Agregar 21% IVA a precios y mostrar resultado con formato moneda
document.getElementById('btnAgregarIVA').addEventListener('click', () => {
  try {
    const cont = document.getElementById('resultadoIVA');
    if (arrayPrecios.length === 0) {
      cont.textContent = 'No hay precios para calcular IVA.';
      return;
    }
    const preciosConIVA = arrayPrecios.map(p => p * 1.21);
    const preciosFormateados = preciosConIVA.map(p => 
      p.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
    );
    cont.textContent = `Precios con 21% IVA: [${preciosFormateados.join(', ')}]`;
  } catch (error) {
    console.error('Error al calcular precios con IVA:', error);
  }
});

// Mostrar los arrays iniciales al cargar la página
mostrarArray(arrayNumeros, 'arrayNumeros');
mostrarArray(arrayNombres, 'arrayNombres');
mostrarArray(arrayPrecios, 'arrayPrecios');
