const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON en las solicitudes entrantes
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Iniciar el servidor y escuchar en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
