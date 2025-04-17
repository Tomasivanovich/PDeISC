// Importación de módulos necesarios
import fs from "node:fs";  // Módulo para trabajar con el sistema de archivos
import { createServer } from "node:http";  // Módulo para crear un servidor HTTP

// Creación del servidor HTTP
const server = createServer((req, res) => {
  
  // Especifica el tipo de contenido y el código de estado (200: OK)
  res.writeHead(200, { "Content-type": "text/plain" });

  // Abrir o crear el archivo file1.txt en modo escritura ("w")
  fs.open("./file1.txt", "w", (err, file) => {

    // Si ocurre un error al abrir/crear el archivo
    if (err) {
      console.log(err);  // Muestra el error en la consola del servidor
      res.write("Ocurrió un error al crear el archivo.");  // Informa al cliente que hubo un error
      res.end();  // Finaliza la respuesta HTTP
      return;  // Termina la ejecución de esta función
    }

    // Si el archivo se abrió/creó correctamente, se envía un mensaje al cliente
    res.write("Archivo guardado con exito!!");

    // Finaliza la respuesta HTTP (se hace aquí para asegurarse de que el mensaje anterior se envíe correctamente)
    res.end();
  });
});

// El servidor comenzará a escuchar en el puerto 3000 de localhost
server.listen(3000, () => {
  // Muestra en la consola del servidor que está funcionando
  console.log("Listening on http://localhost:3000");
});
