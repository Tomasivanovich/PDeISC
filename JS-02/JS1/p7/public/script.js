let arrayActual = [];

function mostrarArray() {
  try {
    const cont = document.getElementById('arrayActual');
    cont.textContent = `[${arrayActual.join(', ')}]`;
  } catch (error) {
    console.error('Error mostrando el array:', error);
  }
}

document.getElementById('btnAgregar').addEventListener('click', () => {
  try {
    const input = document.getElementById('inputAgregar');
    let valor = input.value.trim();
    if (valor === '') return alert('Ingrese un elemento para agregar');

    // Intentar convertir a número si corresponde
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

// 1. Buscar palabra "perro"
document.getElementById('btnBuscarPerro').addEventListener('click', () => {
  try {
    const idx = arrayActual.indexOf('perro');
    const contResultado = document.getElementById('resultadoPerro');
    if (idx === -1) {
      contResultado.textContent = 'La palabra "perro" no está en el array.';
    } else {
      contResultado.textContent = `"perro" encontrado en la posición: ${idx}`;
    }
  } catch (error) {
    console.error('Error buscando "perro":', error);
    alert('Ocurrió un error buscando "perro".');
  }
});

// 2. Verificar número 50
document.getElementById('btnBuscar50').addEventListener('click', () => {
  try {
    const idx = arrayActual.indexOf(50);
    const contResultado = document.getElementById('resultado50');
    if (idx === -1) {
      contResultado.textContent = 'El número 50 no está en el array.';
    } else {
      contResultado.textContent = `El número 50 está en la posición: ${idx}`;
    }
  } catch (error) {
    console.error('Error buscando 50:', error);
    alert('Ocurrió un error buscando el número 50.');
  }
});

// 3. Buscar ciudad "Madrid"
document.getElementById('btnBuscarMadrid').addEventListener('click', () => {
  try {
    const idx = arrayActual.indexOf('Madrid');
    const contResultado = document.getElementById('resultadoMadrid');
    if (idx === -1) {
      contResultado.textContent = '"Madrid" no está en el array.';
    } else {
      contResultado.textContent = `"Madrid" encontrado en la posición: ${idx}`;
    }
  } catch (error) {
    console.error('Error buscando "Madrid":', error);
    alert('Ocurrió un error buscando "Madrid".');
  }
});

mostrarArray();
