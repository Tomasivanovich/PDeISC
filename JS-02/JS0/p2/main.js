// Importamos los módulos necesarios
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Array para almacenar los libros en memoria
const libros = [];

// Clave API para seguridad básica
const API_KEY = "b9e5cdb7a9fc4e10b7c6b8a34ff5e2d8a4c9f18ed124eab5b02f4dd3e1cba7e1";

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// Middleware para parsear el cuerpo de las peticiones como JSON
app.use(express.json());

// Middleware para validar la API Key enviada en los headers
app.use((req, res, next) => {
  const key = req.headers["x-api-key"];

  if (!key) {
    // Si no se envía la clave, devolver error 401 (no autorizado)
    return res.status(401).json({ error: "API key requerida" });
  }

  if (key !== API_KEY) {
    // Si la clave es incorrecta, devolver error 403 (prohibido)
    return res.status(403).json({ error: "API key inválida" });
  }

  next();
});

// Ruta raíz que envía el archivo index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta GET para obtener la lista de libros almacenados
app.get("/libros", (req, res) => {
  res.json(libros);
});

// Ruta POST para agregar un nuevo libro al array
app.post("/libros", (req, res) => {
  const { titulo, autor, genero, anio } = req.body;

  // Validaciones básicas para asegurar que los datos sean válidos
  if (
    !titulo || typeof titulo !== "string" || titulo.trim().length < 3 ||
    !autor || typeof autor !== "string" || autor.trim() === "" ||
    !genero || typeof genero !== "string" || genero.trim() === "" ||
    !anio || typeof anio !== "number" || anio < 1500 || anio > 2025
  ) {
    return res.status(400).json({ error: "Datos inválidos o incompletos" });
  }

  // Agregamos el libro con datos limpios al array
  libros.push({
    titulo: titulo.trim(),
    autor: autor.trim(),
    genero: genero.trim(),
    anio
  });

  // Respondemos con éxito y mensaje
  res.status(201).json({ message: "Libro agregado" });
});

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
