// Importar módulos necesarios
const express = require('express');        // Framework Express
const path = require('path');              // Módulo para trabajar con rutas del sistema de archivos

// Crear una instancia de la aplicación Express
const app = express();

// Definir el puerto en el que el servidor va a escuchar
const PORT = 3000;

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
