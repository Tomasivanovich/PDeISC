const http = require('http');
const fs = require('fs');

// Crea el servidor HTTP
const server = http.createServer((_, res) => {
  // Intenta leer el archivo, lanza error si falla
  const content = fs.readFileSync('./public/index.html') || (() => {
    throw new Error('No se pudo cargar el archivo index.html');
  })();

  // Si no hubo error, responde exitosamente
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(content);
});

// Puerto en el que el servidor quedará a la espera de solicitudes
const PORT = 3000;

// Inicia el servidor
server.listen(PORT, () => {
  console.log(`✅ Servidor HTTP disponible en http://localhost:${PORT}`);
});