const express = require('express');
const path = require('path');

const app = express();

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para cada página
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/pagina1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pagina1.html'));
});

app.get('/pagina2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pagina2.html'));
});

app.get('/pagina3', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pagina3.html'));
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log("Servidor corriendo en: http://127.0.0.1:3000");
});