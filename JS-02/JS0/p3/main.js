const express = require("express");
const path = require("path");
const app = express();
const personas = [];
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) return res.status(401).json({ error: "Api key necesaria" });
  if (
    apiKey !==
    "b9e5cdb7a9fc4e10b7c6b8a34ff5e2d8a4c9f18ed124eab5b02f4dd3e1cba7e1"
  )
    return res.status(403).json({ error: "Api key invalida" });
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/sendData", (req, res) => {
  const {
    nombre,
    apellido,
    edad,
    nacimiento,
    sexo,
    estadoCivil,
    documento,
    nacionalidad,
    telefono,
    email,
    hijos,
    cantidadHijos,
  } = req.body;

  if (!nombre || !apellido) {
    return res.status(400).json({ error: "Nombre y apellido son obligatorios" });
  }

  const persona = {
    nombre,
    apellido,
    edad,
    nacimiento,
    sexo,
    estadoCivil,
    documento,
    nacionalidad,
    telefono,
    email,
    hijos,
    cantidadHijos,
  };

  personas.push(persona);

  res.status(200).json({ message: "Datos recibidos correctamente" });
});

app.get("/obtener", (req, res) => {
  res.json(personas);
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
  });

