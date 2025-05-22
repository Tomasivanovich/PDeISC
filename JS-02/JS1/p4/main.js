const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Arrays persistentes en memoria del servidor
let numeros = [];
let mensajes = [];
let clientes = [];

// Middleware para parsear JSON en el cuerpo de las peticiones
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta POST para guardar datos en los arrays según el tipo recibido
app.post('/guardar', (req, res) => {
    const { tipo, valor } = req.body;

    // Validar que se envíen los datos necesarios
    if (!tipo || valor === undefined) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    // Guardar el valor en el array correspondiente según el tipo
    switch (tipo) {
        case 'numero':
            numeros.push(valor);
            break;
        case 'mensaje':
            mensajes.push(valor);
            break;
        case 'cliente':
            clientes.push(valor);
            break;
        default:
            return res.status(400).json({ error: 'Tipo no válido' });
    }

    // Responder con éxito
    res.json({ success: true });
});

// Ruta POST para sacar (shift) el primer elemento del array según tipo
app.post('/shift', (req, res) => {
    const { tipo } = req.body;
    let quitado;

    // Seleccionar el array y remover el primer elemento
    switch (tipo) {
        case 'numero':
            quitado = numeros.shift();
            break;
        case 'mensaje':
            quitado = mensajes.shift();
            break;
        case 'cliente':
            quitado = clientes.shift();
            break;
        default:
            return res.status(400).json({ error: 'Tipo no válido' });
    }

    // Responder con el elemento removido (puede ser undefined si array vacío)
    res.json({ quitado });
});

// Ruta GET para obtener el contenido actual de todos los arrays
app.get('/obtener', (req, res) => {
    res.json({
        numeros,
        mensajes,
        clientes
    });
});

// Iniciar servidor escuchando en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
