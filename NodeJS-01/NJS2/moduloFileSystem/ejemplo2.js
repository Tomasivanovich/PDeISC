// Importación de módulos 
import fs from "node:fs";  // <-- Módulo fs para interactuar con el sistema de archivos (leer, escribir, etc.)
import { createServer } from "node:http";  // <-- Módulo http para crear el servidor web

// Creación de servidor HTTP
const server = createServer((req, res) => {
  // Intentamos leer el archivo 'file2.txt'
  fs.readFile("./file2.txt", (err, data) => {  // <-- Lee el archivo 'file2.txt' y maneja el error y la data
    // Si hay un error (archivo no encontrado, permisos, etc.), respondemos con código 500 (Error interno del servidor)
    if (err) {
      res.writeHead(500, { "content-type": "text/plain" });  // <-- Configura el código de estado HTTP a 500
      res.write(err.message);  // <-- Escribe el mensaje de error (por ejemplo, si el archivo no existe)
      return res.end();  // <-- Termina la respuesta
    }

    // Si la lectura del archivo fue exitosa, devolvemos el contenido del archivo
    res.writeHead(200, { "Content-type": "text/plain" });  // <-- Configura el código de estado HTTP a 200 (OK)
    res.write(data);  // <-- Escribe el contenido del archivo (lo que está dentro de 'file2.txt')
    return res.end();  // <-- Termina la respuesta y envía la data al cliente
  });
});

// El servidor escucha en el puerto 3000 en localhost
server.listen(3000, () => {
  console.log("http://localhost:3000");  // <-- Muestra el mensaje en la consola indicando que el servidor está corriendo
});
