const $form = document.getElementById("form");

// Enviar datos al servidor
async function sendData(endpoint, data) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Esitoso");
    }

    return response;
  } catch (err) {
    console.log(err);
  }
}

// Obtener todos los datos y mostrarlos en una tabla
async function fetchData(endpoint, display) {
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const data = await response.json();

      if (data.length <= 0) return;

      display.innerHTML = `
        <table class="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th class="px-2 lg:px-4 py-2 text-left border-b">Animal</th>
              <th class="px-2 lg:px-4 py-2 text-left border-b">Jaula</th>
              <th class="px-2 lg:px-4 py-2 text-left border-b">Tipo</th>
              <th class="px-2 lg:px-4 py-2 text-left border-b">Peso</th>
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (animal) => `
                <tr class="transition">
                  <td class="px-2 lg:px-7 py-2 border-b text-center">${animal.name}</td>
                  <td class="px-2 lg:px-7 py-2 border-b text-center">${animal.jail}</td>
                  <td class="px-2 lg:px-7 py-2 border-b text-center">${animal.type}</td>
                  <td class="px-2 lg:px-7 py-2 border-b text-center">${animal.weigth}kg</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
      `;
    }
  } catch (err) {
    console.log(err);
  }
}

// Obtener y mostrar filtros específicos de animales
async function fetchFilteredData(endpoint, display) {
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const data = await response.json();

      if (data.length <= 0) return;

      display.innerHTML = `
        <!-- Felinos entre jaulas 2 y 5 -->
        <h1 class="text-2xl font-semibold text-center mb-2">Felinos</h1>
        <table class="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th class="px-2 lg:px-4 py-2 text-left border-b">Animal</th>
              <th class="px-2 lg:px-4 py-2 text-left border-b">Jaula</th>
              <th class="px-2 lg:px-4 py-2 text-left border-b">Tipo</th>
              <th class="px-2 lg:px-4 py-2 text-left border-b">Peso</th>
            </tr>
          </thead>
          <tbody>
            ${data
              .filter(animal => animal.type === 1 && animal.jail >= 2 && animal.jail <= 5)
              .map(animal => `
                <tr class="transition">
                  <td class="px-2 lg:px-7 py-2 border-b text-center">${animal.name}</td>
                  <td class="px-2 lg:px-7 py-2 border-b text-center">${animal.jail}</td>
                  <td class="px-2 lg:px-7 py-2 border-b text-center">${animal.type}</td>
                  <td class="px-2 lg:px-7 py-2 border-b text-center">${animal.weigth}kg</td>
                </tr>
              `).join("")}
          </tbody>
        </table>

        <!-- Animales en jaula 5 y peso menor a 3kg -->
        <h1 class="text-2xl font-semibold text-center my-2">Jaula 5 y &lt; 3kg</h1>
        <table class="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th class="px-2 lg:px-4 py-2 text-left border-b">Animal</th>
              <th class="px-2 lg:px-4 py-2 text-left border-b">Jaula</th>
              <th class="px-2 lg:px-4 py-2 text-left border-b">Tipo</th>
              <th class="px-2 lg:px-4 py-2 text-left border-b">Peso</th>
            </tr>
          </thead>
          <tbody>
            ${data
              .filter(animal => animal.jail === 5 && animal.weigth < 3)
              .map(animal => `
                <tr class="transition">
                  <td class="px-2 lg:px-7 py-2 border-b text-center">${animal.name}</td>
                  <td class="px-2 lg:px-7 py-2 border-b text-center">${animal.jail}</td>
                  <td class="px-2 lg:px-7 py-2 border-b text-center">${animal.type}</td>
                  <td class="px-2 lg:px-7 py-2 border-b text-center">${animal.weigth}kg</td>
                </tr>
              `).join("")}
          </tbody>
        </table>

        <!-- Animales en jaula 4 y peso menor a 120kg -->
        <h1 class="text-2xl font-semibold text-center my-2">Jaula 4 y &lt; 120kg</h1>
        <table class="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th class="px-2 lg:px-4 py-2 text-left border-b">Animal</th>
              <th class="px-2 lg:px-4 py-2 text-left border-b">Jaula</th>
              <th class="px-2 lg:px-4 py-2 text-left border-b">Tipo</th>
              <th class="px-2 lg:px-4 py-2 text-left border-b">Peso</th>
            </tr>
          </thead>
          <tbody>
            ${data
              .filter(animal => animal.jail === 4 && animal.weigth < 120)
              .map(animal => `
                <tr class="transition">
                  <td class="px-2 lg:px-7 py-2 border-b text-center">${animal.name}</td>
                  <td class="px-2 lg:px-7 py-2 border-b text-center">${animal.jail}</td>
                  <td class="px-2 lg:px-7 py-2 border-b text-center">${animal.type}</td>
                  <td class="px-2 lg:px-7 py-2 border-b text-center">${animal.weigth}kg</td>
                </tr>
              `).join("")}
          </tbody>
        </table>
      `;
    }
  } catch (err) {
    console.log(err);
  }
}

// Manejo del evento de envío del formulario
$form.addEventListener("submit", (e) => {
  e.preventDefault();

  const $animalName = document.getElementById("animal-name");
  const $jailNumber = document.getElementById("jail-number");
  const $animalType = document.getElementById("animal-type");
  const $animalWeigth = document.getElementById("animal-weigth");

  const name = $animalName.value;
  const jail = Number($jailNumber.value);
  const type = Number($animalType.value);
  const weigth = Number($animalWeigth.value);

  sendData("http://localhost:3000/saveAnimal", { name, jail, type, weigth });
  fetchData("http://localhost:3000/animals", document.getElementById("table"));
  fetchFilteredData("http://localhost:3000/animals", document.getElementById("info"));
});

// Carga inicial de datos
fetchData("http://localhost:3000/animals", document.getElementById("table"));
fetchFilteredData("http://localhost:3000/animals", document.getElementById("info"));
