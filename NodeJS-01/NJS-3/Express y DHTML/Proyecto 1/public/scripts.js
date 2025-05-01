// Función reutilizable para obtener un elemento por su ID
function obtenerElemento(id) {
    return document.getElementById(id);
}

// =========================
// Manipulación del H1
// =========================

// Agrega un H1 dinámicamente si no existe ya
function agregarH1() {
    const contenedor = obtenerElemento('contenedor');
    const h1Existente = obtenerElemento('h1-dinamico');

    if (!h1Existente) {
        const h1 = document.createElement('h1');
        h1.id = 'h1-dinamico';
        h1.textContent = 'Hola DOM';
        contenedor.appendChild(h1);
    } else {
        alert('Ya existe el H1');
    }
}

// Elimina el H1 si existe
function eliminarH1() {
    const h1 = obtenerElemento('h1-dinamico');
    if (h1) {
        h1.remove();
    } else {
        alert('No hay H1 para eliminar');
    }
}

// Cambia el texto del H1 a "Chau DOM"
function cambiarTexto() {
    const h1 = obtenerElemento('h1-dinamico');
    if (h1) {
        h1.textContent = 'Chau DOM';
    } else {
        alert('Primero debes agregar el H1');
    }
}

// Restaura el texto original del H1 a "Hola DOM"
function restaurarH1() {
    const h1 = obtenerElemento('h1-dinamico');
    if (h1) {
        h1.textContent = 'Hola DOM';
    } else {
        alert('Primero debes agregar el H1');
    }
}

// Cambia el color del H1 a rojo
function cambiarColor() {
    const h1 = obtenerElemento('h1-dinamico');
    if (h1) {
        h1.style.color = 'red';
    } else {
        alert('Primero debes agregar el H1');
    }
}

// Restaura el color del H1 si está en rojo
function restaurarColor() {
    const h1 = obtenerElemento('h1-dinamico');
    if (h1) {
        if (h1.style.color === 'red') {
            h1.style.color = 'black';
        }
    } else {
        alert('Primero debes agregar el H1');
    }
}

// =========================
// Manipulación de la Imagen
// =========================

// Agrega una imagen al contenedor si no existe aún
function agregarImagen() {
    const contenedor = obtenerElemento('imagen');
    const imagenExistente = obtenerElemento('imagen-dinamica');

    if (!imagenExistente) {
        const imagen = document.createElement('img');
        imagen.id = 'imagen-dinamica';
        imagen.src = 'https://cms.ar-racking.com/uploads/2021/11/stock-seguridad-almacen-1.jpg';
        imagen.alt = 'Imagen';
        contenedor.appendChild(imagen);
    } else {
        alert('Ya existe la imagen');
    }
}

// Cambia la imagen existente por otra
function cambiarImagen() {
    const imagen = obtenerElemento('imagen-dinamica');
    if (imagen) {
        imagen.src = 'https://www.masterlogistica.es/wp-content/uploads/2016/05/pol%C3%ADtica-de-stocks-765x478.jpg';
        imagen.alt = 'Cambio de imagen';
    } else {
        alert('Primero se debe agregar la imagen');
    }
}

// Eliminar la imagen 
function eliminarImagen() {
    const imagen = obtenerElemento('imagen-dinamica');
    if (imagen) {
        imagen.remove();
    } else {
        alert('No hay imagen para eliminar');
    }
}

// Cambia el tamaño de la imagen a 200x200px
function cambiarTamaño() {
    const imagen = obtenerElemento('imagen-dinamica');
    if (imagen) {
        imagen.style.width = '200px';
        imagen.style.height = '200px';
    } else {
        alert("Se requiere una imagen primero");
    }
}
