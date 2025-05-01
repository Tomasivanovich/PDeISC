// Importa las dependencias necesarias
const express = require('express'); // Framework Express para crear servidores
const path = require('path'); // Módulo path para trabajar con rutas de archivos
const app = express(); // Crea una instancia de la aplicación Express

// Configura el middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public'))); 
// Esto permite que cualquier archivo en la carpeta 'public' sea accesible desde el navegador

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log(`Servidor en http://localhost:3000`); // Muestra un mensaje en la consola cuando el servidor está activo
});
