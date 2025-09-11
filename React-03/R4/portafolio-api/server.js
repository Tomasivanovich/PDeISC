const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const creatorsRoutes = require("./routes/creators");
const experienceRoutes = require("./routes/experience");
const projectsRoutes = require("./routes/projects");
const skillsRoutes = require("./routes/skills"); // 👈 Agregado

app.use("/api/creators", creatorsRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/skills", skillsRoutes); // 👈 Agregado

// Levantar servidor
app.listen(4000, () => {
  console.log("✅ Servidor API corriendo en http://localhost:4000");
});
