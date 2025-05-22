// Arrays para almacenar los animales y productos
let animales = [];
let productos = [];

try {
  // Referencias a los elementos del DOM para animales
  const animalForm = document.getElementById('animalForm');
  const animalInput = document.getElementById('animalInput');
  const mensajeAnimal = document.getElementById('mensajeAnimal');
  const listaAnimales = document.getElementById('listaAnimales');
  const borrarUltimoAnimalCheckbox = document.getElementById('borrarUltimoAnimalCheckbox');
  const eliminarAnimalBtn = document.getElementById('eliminarAnimalBtn');

  // Referencias a los elementos del DOM para productos
  const productoForm = document.getElementById('productoForm');
  const productoInput = document.getElementById('productoInput');
  const mensajeProducto = document.getElementById('mensajeProducto');
  const listaProductos = document.getElementById('listaProductos');
  const borrarUltimoProductoCheckbox = document.getElementById('borrarUltimoProductoCheckbox');
  const eliminarProductoBtn = document.getElementById('eliminarProductoBtn');

  // Referencias para eliminar todos los animales
  const eliminarAnimalesCheckbox = document.getElementById('eliminarAnimalesCheckbox');
  const eliminarAnimalesBtn = document.getElementById('eliminarAnimalesBtn');

  // Función para actualizar la lista de animales en el DOM
  function actualizarListaAnimales() {
    listaAnimales.innerHTML = '';
    animales.forEach(animal => {
      const li = document.createElement('li');
      li.textContent = animal;
      listaAnimales.appendChild(li);
    });
  }

  // Función para actualizar la lista de productos en el DOM
  function actualizarListaProductos() {
    listaProductos.innerHTML = '';
    productos.forEach(producto => {
      const li = document.createElement('li');
      li.textContent = producto;
      listaProductos.appendChild(li);
    });
  }

  // Evento para agregar un animal al array y actualizar la lista
  animalForm.addEventListener('submit', function(e) {
    e.preventDefault();

    try {
      const animal = animalInput.value.trim();

      // Validar que el campo no esté vacío
      if (!animal) throw new Error('Por favor ingrese un animal válido.');

      // Agregar animal al array
      animales.push(animal);

      // Limpiar input y actualizar vista
      animalInput.value = '';
      actualizarListaAnimales();

      // Mostrar mensaje de éxito
      mensajeAnimal.textContent = 'Animal agregado correctamente.';
    } catch (err) {
      // Mostrar mensaje de error
      mensajeAnimal.textContent = err.message;
    }
  });

  // Evento para agregar un producto al array y actualizar la lista
  productoForm.addEventListener('submit', function(e) {
    e.preventDefault();

    try {
      const producto = productoInput.value.trim();

      // Validar que el campo no esté vacío
      if (!producto) throw new Error('Por favor ingrese un producto válido.');

      // Agregar producto al array
      productos.push(producto);

      // Limpiar input y actualizar vista
      productoInput.value = '';
      actualizarListaProductos();

      // Mostrar mensaje de éxito
      mensajeProducto.textContent = 'Producto agregado correctamente.';
    } catch (err) {
      // Mostrar mensaje de error
      mensajeProducto.textContent = err.message;
    }
  });

  // Evento para eliminar el último animal si el checkbox está marcado
  eliminarAnimalBtn.addEventListener('click', function() {
    try {
      if (!borrarUltimoAnimalCheckbox.checked || animales.length === 0) {
        throw new Error('No hay animales para eliminar o la opción no está activada.');
      }

      // Eliminar último animal del array
      animales.pop();

      // Actualizar lista y mostrar mensaje
      actualizarListaAnimales();
      mensajeAnimal.textContent = 'Último animal eliminado.';
    } catch (err) {
      mensajeAnimal.textContent = err.message;
    }
  });

  // Evento para eliminar el último producto si el checkbox está marcado
  eliminarProductoBtn.addEventListener('click', function() {
    try {
      if (!borrarUltimoProductoCheckbox.checked || productos.length === 0) {
        throw new Error('No hay productos para eliminar o la opción no está activada.');
      }

      // Eliminar último producto del array y guardar nombre para mensaje
      const eliminado = productos.pop();

      // Actualizar lista y mostrar mensaje
      actualizarListaProductos();
      mensajeProducto.textContent = `Producto "${eliminado}" ha sido eliminado.`;
    } catch (err) {
      mensajeProducto.textContent = err.message;
    }
  });

  // Evento para eliminar todos los animales si el checkbox está marcado
  eliminarAnimalesBtn.addEventListener('click', function() {
    try {
      if (!eliminarAnimalesCheckbox.checked || animales.length === 0) {
        throw new Error('No hay animales para eliminar o la opción no está activada.');
      }

      // Vaciar el array de animales
      animales = [];

      // Actualizar lista y mostrar mensaje
      actualizarListaAnimales();
      mensajeAnimal.textContent = 'Todos los animales han sido eliminados.';
    } catch (err) {
      mensajeAnimal.textContent = err.message;
    }
  });

} catch (err) {
  // Captura errores generales durante la inicialización del script
  console.error("Error al inicializar la aplicación:", err);
  alert("Error crítico en la aplicación. Revisa la consola.");
}
