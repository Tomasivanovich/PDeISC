// Obtiene el elemento con el ID 'contenedor' donde se agregarán los objetos dinámicamente
const contenedor = document.getElementById("contenedor");

// Función para agregar un párrafo dentro del contenedor
function agregarParrafo() {
  // Se agrega un párrafo con texto dentro del contenedor utilizando innerHTML
  contenedor.innerHTML += `<p>Este es un párrafo generado dinámicamente.</p>`;
}

// Función para agregar una imagen dentro del contenedor
function agregarImagen() {
  // Se agrega una imagen con una URL de ejemplo. Establece un estilo en línea con margen
  contenedor.innerHTML += `<img src="https://st.depositphotos.com/1144963/3172/i/380/depositphotos_31724889-stock-photo-working-with-tablet.jpg" alt="Stock Photo" style="margin:5px;">`;
}

// Función para agregar una lista con tres elementos dentro del contenedor
function agregarLista() {
  // Se agrega una lista desordenada (<ul>) con tres elementos (<li>)
  contenedor.innerHTML += `
    <ul>
      <li>Elemento 1</li>
      <li>Elemento 2</li>
      <li>Elemento 3</li>
    </ul>`;
}

// Función para agregar un div con un fondo de color claro dentro del contenedor
function agregarDiv() {
  // Se agrega un div con un fondo de color y padding, y un margen entre los elementos
  contenedor.innerHTML += `<div style="padding:10px; background-color:#eef; margin:5px;"> Un div añadido con innerHTML</div>`;
}

// Función para agregar un campo de entrada de texto (input) dentro del contenedor
function agregarInput() {
  // Se agrega un input de tipo texto con un texto placeholder y un estilo en línea
  contenedor.innerHTML += `<input type="text" placeholder="Texto..." style="display:block; margin:5px;">`;
}
