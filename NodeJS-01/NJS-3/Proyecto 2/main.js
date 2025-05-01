const express = require('express');
const path = require('path');

const app = express();

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rutas para cada componente
app.get('/componente1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'componente1.html'));
});
app.get('/componente2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'componente2.html'));
});
app.get('/componente3', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'componente3.html'));
});
app.get('/componente4', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'componente4.html'));
});
app.get('/componente5', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'componente5.html'));
});

// Inicia el servidor en el puerto 3000
// Una vez iniciado, muestra un mensaje en consola
app.listen(3000, () => {
    console.log('Servidor corriendo en: http://localhost:3000');
});
