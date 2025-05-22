// Importamos la librería Express para crear un servidor web
const express = require('express');

// Creamos una instancia de la aplicación Express
const app = express();

// Definimos el puerto donde escuchará nuestro servidor
const PORT = 3000;

// Middleware para procesar solicitudes con cuerpo JSON
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Iniciamos el servidor y escuchamos en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
