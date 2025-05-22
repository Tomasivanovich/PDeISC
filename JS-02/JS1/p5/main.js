// Importar el módulo Express
const express = require('express');

// Crear instancia de la aplicación Express
const app = express();

// Definir el puerto donde se ejecutará el servidor
const PORT = 3000;

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Endpoint para prueba que responde si el servidor está activo
app.get('/ping', (req, res) => {
  res.json({ message: 'Servidor activo' });
});

// Endpoint que recibe datos vía POST y responde confirmando recepción
app.post('/api', (req, res) => {
  res.json({ message: 'Datos recibidos', recibido: req.body });
});

// Iniciar servidor y escuchar en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
