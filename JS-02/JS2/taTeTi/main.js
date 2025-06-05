const express = require('express');
const app = express();
const PORT = 3000;

// Array para guardar el historial de partidas
// Cada partida es un objeto con jugador1, jugador2 y ganador
let historial = [];

// Middleware para servir archivos estáticos desde carpeta 'public' 
app.use(express.static('public'));

// Middleware para parsear JSON en las solicitudes POST
app.use(express.json());

// Ruta para guardar una partida en el historial
app.post('/guardar-partida', (req, res) => {
  // Extrae los valores 'jugador1', 'jugador2' y 'ganador' del cuerpo de la solicitud (JSON)
  const { jugador1, jugador2, ganador } = req.body;

  // Agrega un nuevo objeto al arreglo 'historial' con los datos recibidos
  historial.push({ jugador1, jugador2, ganador });

  // Responde al cliente con un objeto JSON indicando que la operación fue exitosa
  res.json({ success: true });
});


// Ruta para obtener las últimas 10 partidas, ordenadas desde la más reciente
app.get('/historial', (req, res) => {
  res.json(historial.slice(-10).reverse());
});

// Inicia el servidor en el puerto indicado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
