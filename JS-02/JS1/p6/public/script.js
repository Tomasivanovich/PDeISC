let arrayActual = [];

function mostrarArray() {
  try {
    const cont = document.getElementById('arrayActual');
    cont.textContent = `[${arrayActual.join(', ')}]`;
  } catch (error) {
    console.error('Error mostrando array:', error);
  }
}

document.getElementById('btnAgregar').addEventListener('click', () => {
  try {
    const input = document.getElementById('inputAgregar');
    let valor = input.value.trim();
    if (valor === '') return alert('Ingrese un elemento para agregar');

    // Intento convertir a número si corresponde
    const num = Number(valor);
    valor = isNaN(num) ? valor : num;

    arrayActual.push(valor);
    mostrarArray();
    input.value = '';
  } catch (error) {
    console.error('Error agregando elemento:', error);
    alert('Ocurrió un error al agregar el elemento.');
  }
});

// 1. Copiar primeros 3 elementos
document.getElementById('btnPrimeros3').addEventListener('click', () => {
  try {
    const copia = arrayActual.slice(0, 3);
    const contResultado = document.getElementById('resultadoPrimeros3');
    contResultado.textContent = `Primeros 3 elementos: [${copia.join(', ')}]`;
  } catch (error) {
    console.error('Error al copiar primeros 3 elementos:', error);
    alert('Ocurrió un error al copiar los primeros 3 elementos.');
  }
});

// 2. Copiar desde posición 2 hasta 4 inclusive
document.getElementById('btnPos2a4').addEventListener('click', () => {
  try {
    const copia = arrayActual.slice(2, 5); // posición 2 a 4 inclusive
    const contResultado = document.getElementById('resultadoPos2a4');
    contResultado.textContent = `Elementos posiciones 2 a 4: [${copia.join(', ')}]`;
  } catch (error) {
    console.error('Error al copiar elementos posiciones 2 a 4:', error);
    alert('Ocurrió un error al copiar los elementos de la posición 2 a la 4.');
  }
});

// 3. Copiar últimos 3 elementos
document.getElementById('btnUltimos3').addEventListener('click', () => {
  try {
    const contResultado = document.getElementById('resultadoUltimos3');
    if (arrayActual.length === 0) {
      contResultado.textContent = 'Array vacío';
      return;
    }
    const copia = arrayActual.slice(-3);
    contResultado.textContent = `Últimos 3 elementos: [${copia.join(', ')}]`;
  } catch (error) {
    console.error('Error al copiar últimos 3 elementos:', error);
    alert('Ocurrió un error al copiar los últimos 3 elementos.');
  }
});

mostrarArray();
