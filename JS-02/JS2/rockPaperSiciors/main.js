const express = require('express');
const app = express();
const PORT = 3000;

// Array para almacenar el historial de partidas (máximo 10 últimas)
let historial = [];

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Middleware para parsear JSON en las solicitudes POST
app.use(express.json());

// Ruta para guardar una partida enviada desde el cliente
app.post('/guardar-partida', (req, res) => {
  // Agregar el objeto recibido al historial
  historial.push(req.body);

  // Responder confirmando que se guardó correctamente
  res.json({ success: true });
});

// Ruta para obtener el historial con las últimas 10 partidas (ordenadas de la más reciente a la más antigua)
app.get('/historial', (req, res) => {
  res.json(historial.slice(-10).reverse());
});

// Iniciar el servidor en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
