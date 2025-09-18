const express = require("express");
const cors = require("cors");

const app = express();

// Middleware CORS configurado para tu frontend en Vercel
app.use(cors({
  origin: "https://portafolio-fpj0rfp2b-tomasivanovichs-projects.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Middleware JSON
app.use(express.json());

// Rutas existentes
const creatorsRoutes = require("./routes/creators");
const experienceRoutes = require("./routes/experience");
const projectsRoutes = require("./routes/projects");
const skillsRoutes = require("./routes/skills");

// Rutas de visitantes
const visitorsRoutes = require("./routes/visitors");
const portfolioRoutes = require("./routes/portafolio"); // para ver portafolios y registrar visitas

// Uso de rutas
app.use("/api/creators", creatorsRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/visitors", visitorsRoutes);
app.use("/api/portfolio", portfolioRoutes);

// Levantar servidor en puerto de Railway (o 4000 local)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor API corriendo en http://localhost:${PORT}`);
});
