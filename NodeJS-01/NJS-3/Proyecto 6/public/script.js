// Obtener el formulario y el div donde se mostrarán los resultados
const form = document.getElementById('registro-form'); // Formulario de registro
const resultado = document.getElementById('resultado'); // Div para mostrar resultados

// Agregar un evento para cuando el formulario sea enviado
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Evita que la página se recargue al enviar el formulario

  // Crear un objeto FormData para obtener los datos del formulario
  const formData = new FormData(form);
  
  // Obtener los valores de los campos del formulario
  const nombre = formData.get('nombre'); // Nombre del usuario
  const edad = formData.get('edad'); // Edad del usuario
  const email = formData.get('email'); // Correo electrónico del usuario
  const genero = formData.get('genero'); // Género del usuario (radio button)
  const pais = formData.get('pais'); // País seleccionado en el select
  const intereses = formData.getAll('intereses'); // Intereses seleccionados (checkboxes)

  // Mostrar los datos del formulario de manera dinámica en el HTML
  resultado.innerHTML = `
    <strong>Resultado del registro:</strong><br/>
    <ul>
      <li><strong> Nombre:</strong> ${nombre}</li> <!-- Muestra el nombre -->
      <li><strong> Edad:</strong> ${edad}</li> <!-- Muestra la edad -->
      <li><strong> Email:</strong> ${email}</li> <!-- Muestra el correo -->
      <li><strong> Género:</strong> ${genero}</li> <!-- Muestra el género -->
      <li><strong> País:</strong> ${pais}</li> <!-- Muestra el país -->
      <li><strong> Intereses:</strong> ${intereses.join(', ') || 'Ninguno'}</li> <!-- Muestra los intereses o 'Ninguno' si no se seleccionó ninguno -->
    </ul>
  `;
});
