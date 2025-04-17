// Importación de módulos 
import fs from "node:fs";  // <-- Módulo fs para interactuar con el sistema de archivos (leer, escribir, etc.)
import { createServer } from "node:http";  // <-- Módulo http para crear el servidor web

// Creación del servidor HTTP
const server = createServer((req, res) => {
  // Usamos fs.writeFile para escribir en el archivo 'file3.txt'
  fs.writeFile(
    "file3.txt",  // <-- El archivo donde se escribirá el texto
    "Test de texto agregado desde node",  // <-- El contenido que se escribirá en el archivo
    (err, data) => {  // <-- Función de devolución de llamada (callback) que maneja el error y la data
      if (err) {
        // Si ocurre un error al intentar escribir el archivo, respondemos con un código 500 (Error interno del servidor)
        res.writeHead(500, { "Content-type": "text/plain" });  // <-- Establece el código de estado HTTP a 500
        res.write("Error al escribir el archivo");  // <-- Escribe el mensaje de error
        console.log(err.message);  // <-- Muestra el error en la consola del servidor
        return res.end();  // <-- Finaliza la respuesta
      }
      // Si la escritura fue exitosa, respondemos con un mensaje indicando que el archivo fue escrito correctamente
      res.writeHead(200, { "Content-type": "text/plain" });  // <-- Establece el código de estado HTTP a 200 (OK)
      res.write("Archivo escrito correctamente");  // <-- Escribe el mensaje de éxito
      return res.end();  // <-- Finaliza la respuesta y envía el mensaje al cliente
    }
  );
});

// El servidor escucha en el puerto 3000 en localhost
server.listen(3000, () => {
  console.log("http://localhost:3000");  // <-- Imprime el mensaje en la consola indicando que el servidor está corriendo
});
