// Importar el módulo Express
const express = require('express');

// Crear una instancia de la aplicación Express
const app = express();

// Definir el puerto donde se ejecutará el servidor
const PORT = 3000;

// Middleware para interpretar JSON en el cuerpo de las solicitudes
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Iniciar el servidor en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
