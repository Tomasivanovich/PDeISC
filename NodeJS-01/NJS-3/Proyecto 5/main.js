// Importa el módulo express que es utilizado para crear el servidor
const express = require('express');

// Importa el módulo path para manejar rutas de archivos
const path = require('path');

// Crea una instancia de la aplicación Express
const app = express();

// Configura express para servir archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, 'public')));

// Inicia el servidor en el puerto 3000 y muestra un mensaje en la consola cuando esté listo
app.listen(3000, () => {
  console.log(`Servidor en http://localhost:3000`); // Muestra la URL de acceso en la consola
});
