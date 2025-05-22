// Importar el módulo Express para crear el servidor web
const express = require('express');

// Crear una instancia de la aplicación Express
const app = express();

// Definir el puerto en el que el servidor escuchará
const PORT = 3000;

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Iniciar el servidor y escuchar en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
