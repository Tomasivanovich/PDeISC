//Importar express y la clase
import express from "express";
import Animal from "./animal.js";

//Inicializar app de express y el puerto
const app = express();
const PORT = 3000;

//Middleware para archivos estaticos y json
app.use(express.static("public"));
app.use(express.json());

const ANIMALS = [];

//Ruta raiz
app.get("/", (req, res) => {});

//Endpoint para guardar un animal
app.post("/saveAnimal", (req, res) => {
  const { name, jail, type, weigth } = req.body;

  console.log(name, jail, type, weigth);

  const newAnimal = new Animal(name, jail, type, weigth);

  ANIMALS.push(newAnimal);

  res.status(200);
});

//Endpoint para recuperar los animales
app.get("/animals", (req, res) => {
  res.send(ANIMALS);
});

//Inicializar el servidor con el puerto indicado
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});