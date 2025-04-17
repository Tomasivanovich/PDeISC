// Importación de módulos
import URL from "node:url";  // <-- Importa el módulo URL de Node.js para trabajar con URLs
import { createServer } from "node:http";  // <-- Importa el módulo http para crear un servidor HTTP

// Definimos una URL que vamos a analizar
const addres = "http://localhost:3000";  // <-- URL de ejemplo que será analizada

// Usamos el método parse del módulo URL para descomponer la URL en sus componentes
const data = URL.parse(addres);  // <-- La función parse devuelve un objeto con los detalles de la URL

// Creación del servidor HTTP
const server = createServer((req, res) => {
  // Configuramos los encabezados de la respuesta para indicar que el contenido es HTML
  res.writeHead(200, { "Content-type": "text/html" });

  // Escribimos en la respuesta el puerto de la URL (que en este caso será "3000")
  res.write(`<h1>Port: ${data.port}</h1>`);  // <-- Muestra el puerto de la URL
  
  // Imprime en la consola los datos completos de la URL desglosada
  console.log(data);
  
  // Finaliza la respuesta HTTP
  res.end();
});

// El servidor HTTP se aloja en localhost en el puerto 3000
server.listen(3000, () => {
  // Muestra un mensaje en la consola indicando que el servidor está corriendo en el puerto 3000
  console.log("http://localhost:3000");
});
