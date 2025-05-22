let arrayActual = [];

function mostrarArray() {
  const cont = document.getElementById('arrayActual');
  cont.textContent = `[${arrayActual.join(', ')}]`;
}

// Agregar elementos genéricos al array
document.getElementById('btnAgregar').addEventListener('click', () => {
  const input = document.getElementById('inputAgregar');
  let valor = input.value.trim();
  if (valor === '') return alert('Ingrese un elemento para agregar');

  // Intentar convertir a número si corresponde
  const num = Number(valor);
  valor = isNaN(num) ? valor : num;

  arrayActual.push(valor);
  mostrarArray();
  input.value = '';
});

// 1. Comprobar si contiene la palabra "admin"
document.getElementById('btnCheckAdmin').addEventListener('click', () => {
  const contResultado = document.getElementById('resultadoAdmin');
  if (arrayActual.length === 0) {
    contResultado.textContent = 'El array está vacío.';
    return;
  }
  if (arrayActual.includes('admin')) {
    contResultado.textContent = 'El array contiene la palabra "admin".';
  } else {
    contResultado.textContent = 'El array NO contiene la palabra "admin".';
  }
});

// 2. Indicar si existe "verde" en el array
document.getElementById('btnCheckVerde').addEventListener('click', () => {
  const contResultado = document.getElementById('resultadoVerde');
  if (arrayActual.length === 0) {
    contResultado.textContent = 'El array está vacío.';
    return;
  }
  if (arrayActual.includes('verde')) {
    contResultado.textContent = 'El array contiene "verde".';
  } else {
    contResultado.textContent = 'El array NO contiene "verde".';
  }
});

// 3. Verificar si un número está presente antes de agregarlo
document.getElementById('btnAgregarNumero').addEventListener('click', () => {
  const inputNum = document.getElementById('inputNumeroAgregar');
  let valor = inputNum.value.trim();
  if (valor === '') return alert('Ingrese un número para agregar');

  const num = Number(valor);
  if (isNaN(num)) return alert('Ingrese un número válido');

  const contResultado = document.getElementById('resultadoAgregarNumero');
  if (arrayActual.includes(num)) {
    contResultado.textContent = `El número ${num} ya está en el array. No se agregó.`;
  } else {
    arrayActual.push(num);
    mostrarArray();
    contResultado.textContent = `Número ${num} agregado correctamente.`;
  }
  inputNum.value = '';
});

mostrarArray();
