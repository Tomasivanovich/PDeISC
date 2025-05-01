const express = require('express');
const app = express();

// Ruta para la página principal
app.get("/", (req, res) => {
    res.send('Hola mundo');
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log("Servidor corriendo en: http://127.0.0.1:3000");
});