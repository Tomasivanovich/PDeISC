// Importamos las dependencias necesarias
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Array para almacenar las personas enviadas desde el formulario
const personas = [];

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// Middleware para interpretar JSON en el body de las peticiones
app.use(express.json());

// Middleware para validar la API Key en los headers de cada petición
app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  
  // Clave válida que deben enviar las peticiones
  const validKey = "b9e5cdb7a9fc4e10b7c6b8a34ff5e2d8a4c9f18ed124eab5b02f4dd3e1cba7e1";

  // Si no se incluye API Key, responder con error 401
  if (!apiKey) {
    return res.status(401).json({ error: "Api key necesaria" });
  }

  // Si la API Key es incorrecta, responder con error 403
  if (apiKey !== validKey) {
    return res.status(403).json({ error: "Api key inválida" });
  }

  // Si la API Key es válida, continuar con la siguiente función middleware o ruta
  next();
});

// Ruta para servir el archivo principal index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta POST para recibir datos del formulario y agregar persona
app.post("/enviar", (req, res) => {
  const { name, surname } = req.body;

  // Validación simple de datos: que existan, sean string y tengan al menos 4 caracteres
  if (
    !name ||
    !surname ||
    typeof name !== "string" ||
    typeof surname !== "string" ||
    name.trim().length < 4 ||
    surname.trim().length < 4
  ) {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  // Guardamos la persona con datos limpios
  const persona = {
    name: name.trim(),
    surname: surname.trim(),
  };
  personas.push(persona);

  // Mostrar en consola la lista actualizada de personas con índice
  console.log("Lista actualizada de personas:");
  personas.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name} ${p.surname}`);
  });

  // Enviar respuesta de éxito al cliente
  res.status(201).json({ message: "Persona agregada correctamente" });
});

// Ruta GET para obtener la lista completa de personas
app.get("/obtener", (req, res) => {
  res.json(personas);
});

// Iniciar servidor en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
