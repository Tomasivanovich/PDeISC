// Importacion de modulos
import { upperCase } from "upper-case"; // <-- Importa la función 'upperCase' del paquete 'upper-case' para convertir texto a mayúsculas
import express from "express"; // <-- Importa el módulo 'express' para crear un servidor HTTP

// Creación del servidor HTTP utilizando Express
const app = express(); 

// Definición de la ruta de tipo GET para la raíz "/"
app.get("/", (req, res) => {
  // Convierte el texto "Hola mundo con upperCase" a mayúsculas y lo envía como respuesta
  res.send(upperCase("Hola mundo con upperCase"));
});

// El servidor HTTP se aloja en localhost, escuchando en el puerto 3000
app.listen(3000, () => {
  // Imprime en la consola que el servidor está corriendo y accesible en http://localhost:3000
  console.log("http://localhost:3000");
});
