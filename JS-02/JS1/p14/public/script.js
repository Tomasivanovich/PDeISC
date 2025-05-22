// Arrays para letras y números
let arrayLetras = [];
let arrayNumeros = [];

/**
 * Muestra el array de letras en el contenedor correspondiente
 */
function mostrarArrayLetras() {
  try {
    document.getElementById('arrayLetras').textContent = `[${arrayLetras.join(', ')}]`;
  } catch (error) {
    console.error('Error mostrando arrayLetras:', error);
  }
}

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

// Evento para agregar letra
document.getElementById('btnAgregarLetra').addEventListener('click', () => {
  try {
    const input = document.getElementById('inputLetra');
    const letra = input.value.trim();

    // Validar que sea una sola letra válida (A-Z o a-z)
    if (!letra || letra.length !== 1 || !/[a-zA-Z]/.test(letra)) {
      alert('Ingrese una sola letra válida');
      return;
    }

    arrayLetras.push(letra);
    mostrarArrayLetras();
    input.value = '';
  } catch (error) {
    alert('Error al agregar letra: ' + error.message);
  }
});

// Evento para agregar número
document.getElementById('btnAgregarNumero').addEventListener('click', () => {
  try {
    const input = document.getElementById('inputNumero');
    const valor = input.value.trim();

    if (!valor) {
      alert('Ingrese un número válido');
      return;
    }

    const num = Number(valor);
    if (isNaN(num)) {
      alert('Ingrese un número válido');
      return;
    }

    arrayNumeros.push(num);
    mostrarArrayNumeros();
    input.value = '';
  } catch (error) {
    alert('Error al agregar número: ' + error.message);
  }
});

// Evento para invertir array de letras y mostrar resultado
document.getElementById('btnInvertirLetras').addEventListener('click', () => {
  try {
    const cont = document.getElementById('resultadoLetras');

    if (arrayLetras.length === 0) {
      cont.textContent = 'No hay letras para invertir.';
      return;
    }

    // Crear copia invertida sin modificar el original
    const invertidas = [...arrayLetras].reverse();
    cont.textContent = `[${invertidas.join(', ')}]`;
  } catch (error) {
    console.error('Error invirtiendo letras:', error);
  }
});

// Evento para invertir array de números y mostrar resultado
document.getElementById('btnInvertirNumeros').addEventListener('click', () => {
  try {
    const cont = document.getElementById('resultadoNumeros');

    if (arrayNumeros.length === 0) {
      cont.textContent = 'No hay números para invertir.';
      return;
    }

    const invertidos = [...arrayNumeros].reverse();
    cont.textContent = `[${invertidos.join(', ')}]`;
  } catch (error) {
    console.error('Error invirtiendo números:', error);
  }
});

// Evento para invertir texto ingresado en inputTexto
document.getElementById('btnInvertirTexto').addEventListener('click', () => {
  try {
    const cont = document.getElementById('resultadoTexto');
    const texto = document.getElementById('inputTexto').value;

    if (!texto) {
      cont.textContent = 'Ingrese texto para invertir.';
      return;
    }

    // Invertir string usando split, reverse y join
    const invertido = texto.split('').reverse().join('');
    cont.textContent = `Texto invertido: ${invertido}`;
  } catch (error) {
    console.error('Error invirtiendo texto:', error);
  }
});

// Mostrar arrays iniciales (vacíos)
mostrarArrayLetras();
mostrarArrayNumeros();
