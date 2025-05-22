// Importar Express
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para interpretar JSON en las solicitudes
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Iniciar servidor en el puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
