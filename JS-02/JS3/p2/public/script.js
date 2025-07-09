// Referencias a los elementos del DOM
const fileInput = document.getElementById('fileInput');
const error = document.getElementById('error');
const validosList = document.getElementById('validosList');
const validCount = document.getElementById('validCount');
const invalidCount = document.getElementById('invalidCount');
const porcentaje = document.getElementById('porcentaje');
const resultados = document.getElementById('resultados');
const descargarBtn = document.getElementById('descargarBtn');


let numerosValidos = [];

fileInput.addEventListener('change', function () {
  try {
    // Obtiene el primer archivo seleccionado
    const file = fileInput.files[0];

    // Si no se selecciona ningún archivo, lanza un error
    if (!file) throw 'Debe seleccionar un archivo .txt';

    const reader = new FileReader();

    // Cuando termina de cargar el archivo
    reader.onload = function (e) {
      const contenido = e.target.result;

      // Divide el contenido por líneas, eliminando líneas vacías
      const lineas = contenido.split(/\r?\n/).filter(Boolean);

      const validos = [];
      let invalidos = 0;

      for (const linea of lineas) {
        const numero = linea.trim();

        // Verifica que:
        // - no esté vacío
        // - sea un número entero
        // - empiece y termine con el mismo dígito
        const valido =
          numero.length > 0 &&
          /^\d+$/.test(numero) &&
          numero[0] === numero[numero.length - 1];

        if (valido) {
          validos.push(parseInt(numero));
        } else {
          invalidos++;
        }
      }

      // Ordena los números válidos en forma ascendente
      validos.sort((a, b) => a - b);

      numerosValidos = validos;

      mostrarResultados(validos, lineas.length, invalidos);
    };

    reader.readAsText(file);
  } catch (e) {
    // Muestra cualquier error en pantalla
    error.textContent = e;
  }
});

function mostrarResultados(validos, total, invalidos) {
  // Limpia la lista anterior
  validosList.innerHTML = '';
  resultados.style.display = 'block';

  // Agrega cada número válido a la lista
  validos.forEach(num => {
    const li = document.createElement('li');
    li.textContent = num;
    validosList.appendChild(li);
  });

  // Muestra las estadísticas
  validCount.textContent = validos.length;
  invalidCount.textContent = invalidos;
  porcentaje.textContent = `${((validos.length / total) * 100).toFixed(2)}%`;
}


descargarBtn.addEventListener('click', () => {
  try {
    if (numerosValidos.length === 0) throw 'No hay números válidos para guardar.';

    // Une los números válidos en líneas separadas
    const contenido = numerosValidos.join('\n');

    // Crea un blob de texto con el contenido
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Crea un enlace temporal para descargar el archivo
    const a = document.createElement('a');
    a.href = url;
    a.download = 'numeros-filtrados.txt';
    a.click();

    // Libera el objeto URL para evitar fugas de memoria
    URL.revokeObjectURL(url);
  } catch (e) {
    // Muestra cualquier error durante la descarga
    error.textContent = e;
  }
});