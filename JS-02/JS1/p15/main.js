const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON en el cuerpo de las peticiones
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Rutas absolutas a los archivos de entrada y salida
const inputFilePath = path.join(__dirname, 'SECRETO.IN');
const outputFilePath = path.join(__dirname, 'SECRETO.OUT');

// Función que invierte una palabra
function invertirPalabra(palabra) {
  return palabra.split('').reverse().join('');
}

// Función que decodifica el texto
// Busca grupos entre paréntesis, invierte el orden de palabras dentro del grupo
// y cada palabra la invierte también (letras al revés)
function decodificar(texto) {
  return texto.replace(/\(([^)]+)\)/g, (_, grupo) => {
    const palabras = grupo.trim().split(/\s+/);
    const invertidas = palabras.reverse().map(invertirPalabra);
    return invertidas.join(' ');
  });
}

// Ruta POST para decodificar el texto enviado
app.post('/decodificar', (req, res) => {
  const { secreto } = req.body;

  // Validar que exista texto y que no supere 500 caracteres
  if (!secreto || secreto.length > 500) {
    return res.status(400).json({ error: 'Texto obligatorio con máximo 500 caracteres' });
  }

  // Guardar el texto recibido en SECRETO.IN
  fs.writeFile(inputFilePath, secreto, 'utf8', (err) => {
    if (err) {
      console.error('Error guardando SECRETO.IN:', err);
      return res.status(500).json({ error: 'Error al guardar SECRETO.IN' });
    }

    // Decodificar el texto
    const resultado = decodificar(secreto);

    // Guardar el resultado en SECRETO.OUT
    fs.writeFile(outputFilePath, resultado, 'utf8', (err) => {
      if (err) {
        console.error('Error guardando SECRETO.OUT:', err);
        return res.status(500).json({ error: 'Error al guardar SECRETO.OUT' });
      }

      // Enviar respuesta con el texto original y el decodificado
      res.json({
        entrada: secreto,
        salida: resultado
      });
    });
  });
});

// Iniciar el servidor en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
