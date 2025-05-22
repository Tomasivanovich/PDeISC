let arrayNombres = [];
let arrayNumeros = [];
let arrayObjetos = [];

function mostrarArrayNombres() {
  document.getElementById('arrayNombres').textContent = `[${arrayNombres.join(', ')}]`;
}

function mostrarArrayNumeros() {
  document.getElementById('arrayNumeros').textContent = `[${arrayNumeros.join(', ')}]`;
}

function mostrarArrayObjetos() {
  const cont = document.getElementById('arrayObjetos');
  if (arrayObjetos.length === 0) {
    cont.textContent = '[ ]';
    return;
  }
  // Mostrar array de objetos en formato JSON legible
  cont.textContent = JSON.stringify(arrayObjetos, ['nombre', 'edad'], 2);
}

// Función para validar si un array está vacío y mostrar mensaje en un contenedor
function validarArrayVacio(array, contenedor, mensaje) {
  if (array.length === 0) {
    contenedor.textContent = mensaje;
    return true;
  }
  return false;
}

// Agregar nombre
document.getElementById('btnAgregarNombre').addEventListener('click', () => {
  const input = document.getElementById('inputNombre');
  const nombre = input.value.trim();
  if (!nombre) return alert('Ingrese un nombre válido');
  arrayNombres.push(nombre);
  mostrarArrayNombres();
  input.value = '';
});

// Agregar número
document.getElementById('btnAgregarNumero').addEventListener('click', () => {
  const input = document.getElementById('inputNumero');
  const valor = input.value.trim();
  if (!valor) return alert('Ingrese un número válido');
  const num = Number(valor);
  if (isNaN(num)) return alert('Ingrese un número válido');
  arrayNumeros.push(num);
  mostrarArrayNumeros();
  input.value = '';
});

// Agregar objeto {nombre, edad}
document.getElementById('btnAgregarObjeto').addEventListener('click', () => {
  const inputNombre = document.getElementById('inputObjNombre');
  const inputEdad = document.getElementById('inputObjEdad');
  const nombre = inputNombre.value.trim();
  const edadStr = inputEdad.value.trim();
  if (!nombre) return alert('Ingrese un nombre válido');
  if (!edadStr) return alert('Ingrese una edad válida');
  const edad = Number(edadStr);
  if (isNaN(edad) || edad < 0) return alert('Ingrese una edad válida');
  arrayObjetos.push({ nombre, edad });
  mostrarArrayObjetos();
  inputNombre.value = '';
  inputEdad.value = '';
});

// 1. Mostrar saludos con map
document.getElementById('btnSaludar').addEventListener('click', () => {
  const cont = document.getElementById('resultadoSaludo');
  if (validarArrayVacio(arrayNombres, cont, 'No hay nombres para saludar.')) return;
  const mensajes = arrayNombres.map(nombre => `Hola, ${nombre}!`);
  cont.textContent = mensajes.join(' ');
});

// 2. Mostrar el doble de cada número con map
document.getElementById('btnDoblar').addEventListener('click', () => {
  const cont = document.getElementById('resultadoDoblar');
  if (validarArrayVacio(arrayNumeros, cont, 'No hay números para procesar.')) return;
  const dobles = arrayNumeros.map(num => num * 2);
  cont.textContent = `Doble de cada número: [${dobles.join(', ')}]`;
});

// 3. Mostrar nombre y edad de cada objeto con map
document.getElementById('btnMostrarObjetos').addEventListener('click', () => {
  const cont = document.getElementById('resultadoObjetos');
  if (validarArrayVacio(arrayObjetos, cont, 'No hay objetos para mostrar.')) return;
  const mensajes = arrayObjetos.map(obj => `${obj.nombre} tiene ${obj.edad} años.`);
  cont.textContent = mensajes.join(' ');
});

mostrarArrayNombres();
mostrarArrayNumeros();
mostrarArrayObjetos();
