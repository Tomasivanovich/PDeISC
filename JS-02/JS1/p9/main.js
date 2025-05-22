// Importar la librería Express para crear el servidor
const express = require('express');

// Crear la instancia de la aplicación Express
const app = express();

// Definir el puerto donde correrá el servidor
const PORT = 3000;

// Middleware para parsear JSON en las solicitudes entrantes
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Arrancar el servidor y escuchar conexiones en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
