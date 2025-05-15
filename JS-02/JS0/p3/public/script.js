const $lista = document.getElementById("lista");
let data = null;

// Obtener datos del servidor y renderizarlos en tabla
async function fetchData() {
  try {
    const response = await fetch("/obtener", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "b9e5cdb7a9fc4e10b7c6b8a34ff5e2d8a4c9f18ed124eab5b02f4dd3e1cba7e1",
      },
    });

    if (!response.ok) throw new Error("Error al obtener datos");

    data = await response.json();

    $lista.innerHTML = data
      .map(
        (user, i) => `
        <tr>
          <td class="border px-3 py-2 text-center">${i + 1}</td>
          <td class="border px-3 py-2">${user.nombre}</td>
          <td class="border px-3 py-2">${user.apellido}</td>
          <td class="border px-3 py-2">${user.edad}</td>
          <td class="border px-3 py-2">${user.nacimiento}</td>
          <td class="border px-3 py-2">${user.sexo}</td>
          <td class="border px-3 py-2">${user.estadoCivil}</td>
          <td class="border px-3 py-2">${user.documento}</td>
          <td class="border px-3 py-2">${user.nacionalidad}</td>
          <td class="border px-3 py-2">${user.telefono}</td>
          <td class="border px-3 py-2">${user.email}</td>
          <td class="border px-3 py-2 text-center">${user.hijos ? "Sí" : "No"}</td>
          <td class="border px-3 py-2 text-center">${user.hijos ? user.cantidadHijos : "-"}</td>
        </tr>`
      )
      .join("");
  } catch (err) {
    console.error("Error al cargar datos:", err);
  }
}

// Enviar datos al servidor
async function sendData(data) {
  try {
    const response = await fetch("/sendData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "b9e5cdb7a9fc4e10b7c6b8a34ff5e2d8a4c9f18ed124eab5b02f4dd3e1cba7e1",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Error en el envío");
  } catch (err) {
    console.error(err);
    showAlert("Error al enviar datos", "error");
  }
}

// Validar y enviar formulario
document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const $nombre = document.getElementById("nombre");
  const $apellido = document.getElementById("apellido");
  const $edad = document.getElementById("edad");
  const $nacimiento = document.getElementById("nacimiento");
  const $sexoMasculino = document.getElementById("sexo-masculino");
  const $sexoFemenino = document.getElementById("sexo-femenino");
  const $estadoCivil = document.getElementById("estado-civil");
  const $documento = document.getElementById("documento");
  const $nacionalidad = document.getElementById("nacionalidad");
  const $telefono = document.getElementById("telefono");
  const $email = document.getElementById("email");
  const $hijos = document.getElementById("hijos");
  const $cantidadHijos = document.getElementById("cantidad-hijos");

  // Validaciones
  if ($nombre.value.trim().length < 4) return inputError($nombre, "Ingrese un nombre válido");
  if ($apellido.value.trim().length < 4) return inputError($apellido, "Ingrese un apellido válido");
  if (!$edad.value || isNaN($edad.value) || Number($edad.value) <= 0) return inputError($edad, "Ingrese una edad válida");
  if (!$nacimiento.value) return inputError($nacimiento, "Ingrese una fecha de nacimiento");
  if (!$sexoMasculino.checked && !$sexoFemenino.checked) return inputError($sexoMasculino, "Seleccione el sexo");
  if (!$documento.value.trim()) return inputError($documento, "Ingrese un documento válido");
  if (!$nacionalidad.value.trim()) return inputError($nacionalidad, "Ingrese una nacionalidad");
  if (!$telefono.value.trim()) return inputError($telefono, "Ingrese un teléfono válido");
  if (!$email.value.trim()) return inputError($email, "Ingrese un email válido");
  if ($hijos.checked && $cantidadHijos.value.trim() === "") return inputError($cantidadHijos, "Ingrese la cantidad de hijos");

  const userData = {
    nombre: $nombre.value,
    apellido: $apellido.value,
    edad: $edad.value,
    nacimiento: $nacimiento.value,
    sexo: $sexoMasculino.checked ? "masculino" : "femenino",
    estadoCivil: $estadoCivil.value,
    documento: $documento.value,
    nacionalidad: $nacionalidad.value,
    telefono: $telefono.value,
    email: $email.value,
    hijos: $hijos.checked,
    cantidadHijos: $hijos.checked ? $cantidadHijos.value : 0,
  };

  await sendData(userData);
  showAlert("Datos enviados correctamente", "success");

  // Limpiar
  e.target.reset();
  $cantidadHijos.disabled = true;
  fetchData();
});

// Mostrar mensaje de error y aplicar estilos
function inputError(input, mensaje) {
  input.focus();
  input.classList.add("bg-red-200", "border-red-400", "text-red-500");
  showAlert(mensaje, "error");
}

// Mostrar alerta flotante
function showAlert(msg, type) {
  const $alerta = document.getElementById("alerta");
  const $mensaje = document.getElementById("mensaje");

  $mensaje.textContent = msg;

  $alerta.classList.remove("bg-red-200", "border-red-500", "bg-green-200", "border-green-500");
  $mensaje.classList.remove("text-red-500", "text-green-500");

  if (type === "error") {
    $alerta.classList.add("bg-red-200", "border-red-500");
    $mensaje.classList.add("text-red-500");
  } else {
    $alerta.classList.add("bg-green-200", "border-green-500");
    $mensaje.classList.add("text-green-500");
  }

  $alerta.classList.remove("translate-y-[-50px]");
  $alerta.classList.add("translate-y-[10px]");

  setTimeout(() => {
    $alerta.classList.remove("translate-y-[10px]");
    $alerta.classList.add("translate-y-[-50px]");
  }, 3000);
}

// Habilitar o deshabilitar campo cantidad de hijos
document.getElementById("hijos").addEventListener("change", (e) => {
  document.getElementById("cantidad-hijos").disabled = !e.target.checked;
});

// Cargar lista al inicio
fetchData();
