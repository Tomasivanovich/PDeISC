// Obtener referencias a elementos del DOM
const $form = document.getElementById("form");
const $alerta = document.getElementById("alerta");
const $lista = document.getElementById("lista");

// Función para obtener los libros desde el backend y mostrarlos en la tabla
async function fetchData() {
  try {
    const res = await fetch("/libros", {
      headers: {
        "x-api-key": "b9e5cdb7a9fc4e10b7c6b8a34ff5e2d8a4c9f18ed124eab5b02f4dd3e1cba7e1",
      },
    });

    if (!res.ok) throw new Error("Error al obtener datos");

    const libros = await res.json();

    // Limpiar la tabla antes de agregar nuevos datos
    $lista.innerHTML = "";

    // Crear filas para cada libro y agregarlas al tbody
    libros.forEach(({ titulo, autor, genero, anio }) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${titulo}</td>
        <td>${autor}</td>
        <td>${genero}</td>
        <td>${anio}</td>
      `;
      $lista.appendChild(tr);
    });

    // Mostrar en consola solo los títulos para no saturar
    console.log("Libros registrados:", libros.map(l => l.titulo));
  } catch (error) {
    console.error(error);
  }
}

// Función para mostrar alertas con mensaje y tipo (success o error)
function showAlert(msg, type = "success") {
  $alerta.textContent = msg;

  // Resetear clases
  $alerta.className = "";

  // Añadir clases según tipo de alerta
  $alerta.classList.add(type === "error" ? "error" : "show");

  // Quitar alerta después de 3 segundos
  setTimeout(() => {
    $alerta.classList.remove("show", "error");
  }, 3000);
}

// Evento submit del formulario
$form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Validación HTML5 nativa
  if (!$form.checkValidity()) {
    showAlert("Por favor, completa correctamente todos los campos.", "error");
    return;
  }

  // Validación adicional para el año
  const anio = Number($form.anio.value);
  if (anio < 1500 || anio > 2025) {
    showAlert("El año debe estar entre 1500 y 2025.", "error");
    return;
  }

  // Construir objeto libro con datos limpios
  const libro = {
    titulo: $form.titulo.value.trim(),
    autor: $form.autor.value.trim(),
    genero: $form.genero.value.trim(),
    anio,
  };

  try {
    // Enviar datos al servidor vía POST
    const res = await fetch("/libros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "b9e5cdb7a9fc4e10b7c6b8a34ff5e2d8a4c9f18ed124eab5b02f4dd3e1cba7e1",
      },
      body: JSON.stringify(libro),
    });

    if (!res.ok) throw new Error("Error al enviar datos");

    // Mostrar éxito, resetear formulario y actualizar lista
    showAlert("Libro registrado correctamente.");
    $form.reset();
    fetchData();
  } catch (err) {
    console.error(err);
    showAlert("Error al guardar el libro.", "error");
  }
});

// Cargar la lista de libros al cargar la página
fetchData();
