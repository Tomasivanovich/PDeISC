const numeros = [];

// Referencias a elementos del DOM
const input = document.getElementById('numeroInput');
const error = document.getElementById('error');
const lista = document.getElementById('numerosList');
const btnDescargar = document.getElementById('descargarBtn');


function agregarNumero() {
  try {
    // Intenta convertir el valor ingresado en número decimal
    const valor = parseFloat(input.value);

    // Validación: asegurarse de que se ingresó un número válido
    if (isNaN(valor)) {
      throw 'Por favor, ingrese un número válido.';
    }

    // Validación: limitar la cantidad de entradas a 20
    if (numeros.length >= 20) {
      throw 'Ya se ingresaron los 20 números permitidos.';
    }

    // Si pasa las validaciones, agregar el número a la lista
    numeros.push(valor);

    // Limpiar el campo de entrada y cualquier mensaje de error previo
    input.value = '';
    error.textContent = '';

    // Crear y mostrar el nuevo elemento en la lista HTML
    const li = document.createElement('li');
    li.textContent = `Número ${numeros.length}: ${valor}`;
    lista.appendChild(li);

    // Mostrar el botón de descarga si ya hay al menos 10 números
    if (numeros.length >= 10) {
      btnDescargar.style.display = 'inline-block';
    }
  } catch (e) {
    // Mostrar mensaje de error en pantalla
    error.textContent = e;
  }
}


function descargarArchivo() {
  try {
    // Validación: asegurarse de que haya al menos 10 números antes de permitir la descarga
    if (numeros.length < 10) {
      throw 'Debe ingresar al menos 10 números para descargar.';
    }

    // Generar el contenido del archivo con saltos de línea
    const contenido = numeros.join('\n');

    // Crear un objeto Blob de tipo texto
    const blob = new Blob([contenido], { type: 'text/plain' });

    // Crear una URL temporal para el Blob
    const url = URL.createObjectURL(blob);

    // Crear y simular clic en un enlace para descargar el archivo
    const a = document.createElement('a');
    a.href = url;
    a.download = 'numeros.txt';
    a.click();

    // Liberar el recurso del objeto URL
    URL.revokeObjectURL(url);
  } catch (e) {
    // Mostrar mensaje de error en pantalla si ocurre un problema
    error.textContent = e;
  }
}

// Asocia eventos de clic a los botones correspondientes
document.getElementById('agregarBtn').addEventListener('click', agregarNumero);
btnDescargar.addEventListener('click', descargarArchivo);
