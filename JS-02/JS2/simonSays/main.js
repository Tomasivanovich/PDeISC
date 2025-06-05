const express = require('express');
const app = express();
const PORT = 3000;

// Array para guardar los puntajes en memoria
// Cada elemento: { name: 'Ana', score: 5 }
let scores = [];

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Middleware para parsear JSON en las peticiones POST
app.use(express.json());

// Ruta para guardar el puntaje enviado por el cliente
app.post('/guardar-puntaje', (req, res) => {
  const { name, score } = req.body;

  // Buscar si ya existe un puntaje para ese jugador
  const existing = scores.find(p => p.name === name);

  // Si no existe o si el nuevo puntaje es mayor, actualizar o agregar
  if (!existing || score > existing.score) {
    if (existing) {
      existing.score = score;
    } else {
      scores.push({ name, score });
    }
  }

  // Responder con éxito
  res.json({ success: true });
});

// Ruta para obtener el listado de puntajes ordenados de mayor a menor
app.get('/puntajes', (req, res) => {
  res.json(scores.sort((a, b) => b.score - a.score));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
