// Importación de módulos
import URL from "node:url";  // <-- Importa el módulo URL para trabajar con URLs en Node.js
import { createServer } from "node:http";  // <-- Importa el módulo http para crear un servidor HTTP

// Definimos una URL para analizar
const addres = "http://localhost:3000";  // <-- URL que se va a analizar

// Usamos el método parse del módulo URL para obtener los componentes de la URL
const data = URL.parse(addres);  // <-- La función parse devuelve un objeto con la información de la URL

// Creación del servidor HTTP
const server = createServer((req, res) => {
  // Configuración de los encabezados de la respuesta para que sea de tipo HTML
  res.writeHead(200, { "Content-type": "text/html" });
  
  // Enviamos una respuesta con el hostname de la URL (que es "localhost" en este caso)
  res.write(`<h1>Hostname: ${data.hostname}</h1>`);  // <-- Muestra el hostname en el navegador
  
  // Se imprime la información completa de la URL en la consola
  console.log(data);
  
  // Finaliza la respuesta
  res.end();
});

// El servidor HTTP se aloja en localhost en el puerto 3000
server.listen(3000, () => {
  // Muestra en la consola un mensaje indicando que el servidor está corriendo
  console.log("http://localhost:3000");
});
