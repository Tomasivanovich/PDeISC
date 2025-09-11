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
const skillsRoutes = require("./routes/skills");

app.use("/api/creators", creatorsRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/skills", skillsRoutes);

app.get("/", (req, res) => {
  res.send("🌍 API de Portafolio funcionando. Endpoints: /api/creators, /api/experience, /api/projects, /api/skills");
});

// Levantar servidor (Render define el puerto en process.env.PORT)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor API corriendo en http://localhost:${PORT}`);
});
