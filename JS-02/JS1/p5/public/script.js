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
    const valor = input.value.trim();
    if (!valor) return alert('Ingrese un elemento para agregar');
    arrayActual.push(valor);
    mostrarArray();
    input.value = '';
  } catch (error) {
    console.error('Error agregando elemento:', error);
    alert('Ocurrió un error al agregar el elemento.');
  }
});

document.getElementById('formEliminar').addEventListener('submit', e => {
  e.preventDefault();
  try {
    const form = e.target;
    const posicion = Number(form.posicion.value);
    const cantidad = Number(form.cantidad.value);
    const contResultado = document.getElementById('resultadoEliminar');

    if (posicion < 0 || posicion >= arrayActual.length) {
      contResultado.textContent = 'Error: posición fuera de rango.';
      return;
    }

    arrayActual.splice(posicion, cantidad);
    mostrarArray();
    contResultado.textContent = `Array modificado: [${arrayActual.join(', ')}]`;
  } catch (error) {
    console.error('Error eliminando elementos:', error);
    alert('Ocurrió un error al eliminar elementos.');
  }
});

document.getElementById('formInsertar').addEventListener('submit', e => {
  e.preventDefault();
  try {
    const form = e.target;
    const posicion = Number(form.posicion.value);
    const elemento = form.elemento.value.trim();
    const contResultado = document.getElementById('resultadoInsertar');

    if (posicion < 0 || posicion > arrayActual.length) {
      contResultado.textContent = 'Error: posición fuera de rango.';
      return;
    }
    if (!elemento) {
      contResultado.textContent = 'Error: elemento vacío.';
      return;
    }

    arrayActual.splice(posicion, 0, elemento);
    mostrarArray();
    contResultado.textContent = `Array modificado: [${arrayActual.join(', ')}]`;
  } catch (error) {
    console.error('Error insertando elemento:', error);
    alert('Ocurrió un error al insertar el elemento.');
  }
});

document.getElementById('formReemplazar').addEventListener('submit', e => {
  e.preventDefault();
  try {
    const form = e.target;
    const posicion = Number(form.posicion.value);
    const cantidad = Number(form.cantidad.value);
    const nuevos = form.nuevos.value.split(',').map(s => s.trim()).filter(Boolean);
    const contResultado = document.getElementById('resultadoReemplazar');

    if (posicion < 0 || posicion >= arrayActual.length) {
      contResultado.textContent = 'Error: posición fuera de rango.';
      return;
    }
    if (cantidad < 1) {
      contResultado.textContent = 'Error: cantidad debe ser mayor o igual a 1.';
      return;
    }
    if (nuevos.length === 0) {
      contResultado.textContent = 'Error: debe ingresar al menos un nuevo elemento.';
      return;
    }

    arrayActual.splice(posicion, cantidad, ...nuevos);
    mostrarArray();
    contResultado.textContent = `Array modificado: [${arrayActual.join(', ')}]`;
  } catch (error) {
    console.error('Error reemplazando elementos:', error);
    alert('Ocurrió un error al reemplazar elementos.');
  }
});

mostrarArray();
