// Arrays para almacenar datos
let arrayNumeros = [];
let arrayEnteros = [];
let arrayPrecios = [];

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
 * Muestra el array de enteros en el contenedor correspondiente
 */
function mostrarArrayEnteros() {
  try {
    document.getElementById('arrayEnteros').textContent = `[${arrayEnteros.join(', ')}]`;
  } catch (error) {
    console.error('Error mostrando arrayEnteros:', error);
  }
}

/**
 * Muestra el array de precios en formato {precio: valor}
 */
function mostrarArrayPrecios() {
  try {
    const cont = document.getElementById('arrayPrecios');
    if (arrayPrecios.length === 0) {
      cont.textContent = '[ ]';
      return;
    }
    cont.textContent = arrayPrecios
      .map(p => `{precio: ${p.precio}}`)
      .join(', ');
  } catch (error) {
    console.error('Error mostrando arrayPrecios:', error);
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

// Evento para agregar entero al arrayEnteros
document.getElementById('btnAgregarEntero').addEventListener('click', () => {
  try {
    const input = document.getElementById('inputEntero');
    const valor = input.value.trim();
    if (!valor) throw new Error('Ingrese un entero válido');

    const num = Number(valor);
    if (!Number.isInteger(num)) throw new Error('Ingrese un entero válido');

    arrayEnteros.push(num);
    mostrarArrayEnteros();
    input.value = '';
  } catch (error) {
    alert(error.message);
  }
});

// Evento para agregar precio {precio} al arrayPrecios
document.getElementById('btnAgregarPrecio').addEventListener('click', () => {
  try {
    const input = document.getElementById('inputPrecio');
    const valor = input.value.trim();
    if (!valor) throw new Error('Ingrese un precio válido');

    const num = Number(valor);
    if (isNaN(num)) throw new Error('Ingrese un precio válido');

    arrayPrecios.push({ precio: num });
    mostrarArrayPrecios();
    input.value = '';
  } catch (error) {
    alert(error.message);
  }
});

// Sumar todos los números del arrayNumeros
document.getElementById('btnSumar').addEventListener('click', () => {
  try {
    const cont = document.getElementById('resultadoSuma');
    if (arrayNumeros.length === 0) {
      cont.textContent = 'No hay números para sumar.';
      return;
    }
    const suma = arrayNumeros.reduce((acc, val) => acc + val, 0);
    cont.textContent = `Suma total: ${suma}`;
  } catch (error) {
    console.error('Error sumando números:', error);
  }
});

// Multiplicar todos los enteros del arrayEnteros
document.getElementById('btnMultiplicar').addEventListener('click', () => {
  try {
    const cont = document.getElementById('resultadoMultiplicar');
    if (arrayEnteros.length === 0) {
      cont.textContent = 'No hay enteros para multiplicar.';
      return;
    }
    const producto = arrayEnteros.reduce((acc, val) => acc * val, 1);
    cont.textContent = `Producto total: ${producto}`;
  } catch (error) {
    console.error('Error multiplicando enteros:', error);
  }
});

// Sumar todos los precios del arrayPrecios
document.getElementById('btnTotalPrecios').addEventListener('click', () => {
  try {
    const cont = document.getElementById('resultadoTotalPrecios');
    if (arrayPrecios.length === 0) {
      cont.textContent = 'No hay precios para sumar.';
      return;
    }
    const total = arrayPrecios.reduce((acc, obj) => acc + obj.precio, 0);
    cont.textContent = `Total de precios: ${total.toFixed(2)}`;
  } catch (error) {
    console.error('Error sumando precios:', error);
  }
});

// Mostrar arrays al iniciar la página
mostrarArrayNumeros();
mostrarArrayEnteros();
mostrarArrayPrecios();
