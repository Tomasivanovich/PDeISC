// Importamos los módulos necesarios
const express = require('express');
const path = require('path');

// Inicializamos la app de Express
const app = express();

// Middleware para servir archivos estáticos (HTML, CSS, JS, imágenes, etc.)
// desde la carpeta 'public' ubicada en la raíz del proyecto.
// Esto permite que los archivos sean accesibles directamente desde el navegador.
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal (cuando accedemos a '/')
// Envía el archivo index.html ubicado en /public como respuesta al cliente.
// Utilizamos path.join para construir la ruta de manera compatible con cualquier sistema operativo.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia el servidor en el puerto 3000
// Una vez iniciado, muestra un mensaje en consola
app.listen(3000, () => {
    console.log('Servidor corriendo en: http://localhost:3000');
});
