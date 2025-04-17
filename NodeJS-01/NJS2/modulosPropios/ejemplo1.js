// Importación de los módulos 
import { createServer } from "node:http";  // Módulo http para crear el servidor web
import { areaCirculo, volumenCilindro, areaTriangulo } from "./modulo.js";  // Importación de las funciones matemáticas desde el archivo "modulo.js"

// Creación del servidor HTTP
const server = createServer((req, res) => {
  const radio = 5; // Radio del círculo y del cilindro
  const altura = 10; // Altura del cilindro
  const ladoA = 3, ladoB = 4, ladoC = 5; // Lados del triángulo

  // Cálculos de las fórmulas utilizando los módulos importados
  const area = areaCirculo(radio); // Calcula el área del círculo
  const volumen = volumenCilindro(radio, altura); // Calcula el volumen del cilindro
  const areaTriang = areaTriangulo(ladoA, ladoB, ladoC); // Calcula el área del triángulo

  // Establecemos los encabezados HTTP para una respuesta de tipo HTML
  res.writeHead(200, { "Content-type": "text/html" });

  // Escribimos la respuesta HTML con los resultados de los cálculos
  res.write(`
    <h1>Formulas Matematicas</h1>
    <p><strong>Area de un circulo con radio ${radio}:</strong> ${area.toFixed(2)} unidades elevadas al cuadrado</p>
    <p><strong>Volumen de un cilindro con radio ${radio} y altura ${altura}:</strong> ${volumen.toFixed(2)} unidades elevadas al cubo</p>
    <p><strong>Area de un triangulo con lados ${ladoA}, ${ladoB}, ${ladoC}:</strong> ${areaTriang.area ? areaTriang.area.toFixed(2) : areaTriang.mensaje}</p>
  `);  // Imprime el resultado de cada cálculo en formato HTML

  res.end();  // Finaliza la respuesta HTTP y la envía al cliente
});

// El servidor escucha en el puerto 3000 y muestra el mensaje en consola
server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");  // Indica en la consola que el servidor está corriendo
});
