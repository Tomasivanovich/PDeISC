// Referencias a elementos del DOM
const form = document.getElementById('formSecreto');
const resultadoDiv = document.getElementById('resultado');
const entradaP = document.getElementById('entrada');
const salidaP = document.getElementById('salida');

// Evento submit del formulario
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Evitar recarga de página

  // Obtener y limpiar el texto secreto ingresado
  const secreto = form.secreto.value.trim();

  // Validación simple del input
  if (!secreto) {
    alert('Por favor ingrese un texto secreto.');
    return;
  }

  try {
    // Enviar el texto secreto al endpoint '/decodificar' con método POST
    const res = await fetch('/decodificar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secreto })
    });

    // Verificar si la respuesta fue exitosa
    if (!res.ok) {
      // Intentar leer el mensaje de error del servidor
      const errorData = await res.json();
      alert(errorData.error || 'Error en la petición');
      return;
    }

    // Leer la respuesta JSON con datos decodificados
    const data = await res.json();

    // Mostrar los textos recibidos en la interfaz
    entradaP.textContent = data.entrada;
    salidaP.textContent = data.salida;
    resultadoDiv.style.display = 'block'; // Hacer visible el contenedor de resultados

  } catch (error) {
    // Capturar errores de conexión o inesperados
    alert('Error al comunicarse con el servidor');
    console.error(error);
  }
});
