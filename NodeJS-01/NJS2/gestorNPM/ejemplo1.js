// Importacion de modulos
import express from "express" // <-- Importación del módulo express para crear un servidor HTTP

// Creación del servidor HTTP
const app = express() 

// Definimos la ruta de tipo GET para la raíz "/"
app.get("/", (req, res) => {
  // Cuando se accede a la raíz (http://localhost:3000), se envía un mensaje como respuesta
  res.send("Hola mundo desde nodejs con express")
})

// El servidor HTTP escucha en el puerto 3000 y se aloja en localhost
app.listen(3000, () => {
  // Muestra en la consola un mensaje indicando que el servidor está corriendo en el puerto 3000
  console.log("http://localhost:3000")
})
