// Referencias a elementos del DOM
const listaUsuarios = document.getElementById("lista");
const form = document.getElementById("form");
const alerta = document.getElementById("alerta");
const mensaje = document.getElementById("mensaje");

// Evento submit del formulario
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evitar recarga de página al enviar

  // Obtener inputs del formulario
  const inputName = document.getElementById("name");
  const inputSurname = document.getElementById("surname");

  // Validar con HTML5 usando checkValidity()
  if (!inputName.checkValidity()) {
    mostrarAlerta("Ingrese un nombre válido (mínimo 4 caracteres)", "error");
    marcarError(inputName);
    return;
  }

  if (!inputSurname.checkValidity()) {
    mostrarAlerta("Ingrese un apellido válido (mínimo 4 caracteres)", "error");
    marcarError(inputSurname);
    return;
  }

  // Quitar estilos de error si hay
  limpiarError(inputName);
  limpiarError(inputSurname);

  // Crear objeto con los datos limpios
  const datos = {
    name: inputName.value.trim(),
    surname: inputSurname.value.trim(),
  };

  // Mostrar mensaje de éxito localmente
  mostrarAlerta("Datos ingresados con éxito", "success");

  // Enviar datos al backend
  await enviarDatos(datos);

  // Recargar la lista de usuarios mostrada
  cargarUsuarios();
});

// Función para cargar usuarios desde el backend y mostrar en la lista
async function cargarUsuarios() {
  try {
    const res = await fetch("/obtener", {
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "b9e5cdb7a9fc4e10b7c6b8a34ff5e2d8a4c9f18ed124eab5b02f4dd3e1cba7e1",
      },
    });

    if (res.ok) {
      const data = await res.json();

      // Renderizar lista de usuarios con formato: nombre, apellido
      listaUsuarios.innerHTML = data
        .map((u) => `<li class="usuario-item">${u.name}, ${u.surname}</li>`)
        .join("");
    }
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }
}

// Función para enviar datos al backend vía POST
async function enviarDatos(datos) {
  try {
    const res = await fetch("/enviar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "b9e5cdb7a9fc4e10b7c6b8a34ff5e2d8a4c9f18ed124eab5b02f4dd3e1cba7e1",
      },
      body: JSON.stringify(datos),
    });

    // Mostrar alerta si ocurre algún error
    if (!res.ok) {
      mostrarAlerta("Error al enviar datos", "error");
    }
  } catch (error) {
    mostrarAlerta("Error al enviar datos", "error");
  }
}

// Función para mostrar una alerta con texto y tipo (error o success)
function mostrarAlerta(texto, tipo) {
  mensaje.textContent = texto;
  alerta.classList.remove("oculto");
  alerta.classList.remove("alerta-error", "alerta-exito");

  if (tipo === "error") {
    alerta.classList.add("alerta-error");
  } else {
    alerta.classList.add("alerta-exito");
  }

  // Ocultar la alerta luego de 3 segundos
  setTimeout(() => {
    alerta.classList.add("oculto");
  }, 3000);
}

// Función para marcar un input con estilo de error
function marcarError(input) {
  input.classList.add("input-error");
  input.focus();
}

// Función para limpiar estilos de error de un input
function limpiarError(input) {
  input.classList.remove("input-error");
}

// Cargar usuarios al cargar la página
cargarUsuarios();
