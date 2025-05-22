// Importar el framework Express
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para interpretar JSON en las solicitudes
app.use(express.json());

// Middleware para servir contenido estático desde la carpeta 'public'
app.use(express.static('public'));

// Iniciar el servidor en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
