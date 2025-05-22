// Arrays para almacenar números, frutas y amigos
const numeros = [];
const frutas = [];
const amigos = [];

// Elementos para manejo de números
const formularioNumero = document.getElementById('numeroForm');
const inputNumero = document.getElementById('numeroInput');
const mensajeNumeros = document.getElementById('mensajeNumero');
const listaNumeros = document.getElementById('listaNumeros');

// Evento para agregar número al array
formularioNumero.addEventListener('submit', function (e) {
  e.preventDefault();

  const numero = parseFloat(inputNumero.value);

  try {
    // Validar que el valor ingresado sea un número
    if (isNaN(numero)) {
      throw new Error("Por favor ingresa un número válido.");
    }

    // Obtener el último número del array para comparar
    const ultimo = numeros[numeros.length - 1];

    // Validar que el nuevo número sea mayor que el último agregado
    if (numeros.length > 0 && numero <= ultimo) {
      throw new Error(`El número ${numero} no se agregó porque no es mayor que el último (${ultimo}).`);
    }

    // Agregar el número al array si pasa las validaciones
    numeros.push(numero);

    // Mostrar mensaje de éxito
    mensajeNumeros.textContent = `Número ${numero} agregado.`;

    // Actualizar la lista visible en el HTML
    actualizarLista(numeros, listaNumeros);

  } catch (error) {
    // Mostrar el mensaje de error en caso de fallo en validación
    mensajeNumeros.textContent = error.message;
  }

  // Resetear el formulario después de procesar
  formularioNumero.reset();
});

// Elementos para manejo de frutas
const formularioFruta = document.getElementById('frutaForm');
const inputFruta = document.getElementById('frutaInput');
const mensajeFrutas = document.getElementById('mensajeFruta');
const listaFrutas = document.getElementById('listaFrutas');

// Evento para agregar fruta al array
formularioFruta.addEventListener('submit', function (e) {
  e.preventDefault();

  const fruta = inputFruta.value.trim();

  try {
    // Validar que el campo no esté vacío
    if (fruta === '') {
      throw new Error("Por favor ingresa una fruta válida.");
    }

    // Agregar la fruta al array
    frutas.push(fruta);

    // Mostrar mensaje de éxito
    mensajeFrutas.textContent = `Fruta "${fruta}" agregada.`;

    // Actualizar la lista visible en el HTML
    actualizarLista(frutas, listaFrutas);

  } catch (error) {
    // Mostrar mensaje de error
    mensajeFrutas.textContent = error.message;
  }

  // Resetear el formulario
  formularioFruta.reset();
});

// Elementos para manejo de amigos
const formularioAmigo = document.getElementById('amigoForm');
const inputAmigo = document.getElementById('amigoInput');
const mensajeAmigos = document.getElementById('mensajeAmigo');
const listaAmigos = document.getElementById('listaAmigos');

// Evento para agregar amigo al array
formularioAmigo.addEventListener('submit', function (e) {
  e.preventDefault();

  const amigo = inputAmigo.value.trim();

  try {
    // Validar que el campo no esté vacío
    if (amigo === '') {
      throw new Error("Por favor ingresa un nombre válido.");
    }

    // Agregar el amigo al array
    amigos.push(amigo);

    // Mostrar mensaje de éxito
    mensajeAmigos.textContent = `Amigo "${amigo}" agregado.`;

    // Actualizar la lista visible en el HTML
    actualizarLista(amigos, listaAmigos);

  } catch (error) {
    // Mostrar mensaje de error
    mensajeAmigos.textContent = error.message;
  }

  // Resetear el formulario
  formularioAmigo.reset();
});

// Función para actualizar la lista HTML a partir de un array y un elemento UL
function actualizarLista(array, ulElement) {
  // Limpiar la lista actual
  ulElement.innerHTML = '';

  // Recorrer el array y crear un <li> para cada elemento
  array.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    ulElement.appendChild(li);
  });
}
