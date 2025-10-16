// server.js
import express from "express";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import cors from "cors";
import helmet from "helmet";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// --------------------
// Crear carpetas uploads y photos si no existen
// --------------------
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const photoDir = path.join(uploadDir, "photos");
if (!fs.existsSync(photoDir)) fs.mkdirSync(photoDir);

// Servir archivos de la carpeta 'uploads'
app.use("/uploads", express.static(uploadDir));

// --------------------
// Conexión a la base de datos MySQL
// --------------------
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "login",
});

// --------------------
// Clave secreta JWT
// --------------------
const JWT_SECRET = "clave_secreta_super_segura";

// --------------------
// Middleware de autenticación
// --------------------
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token requerido" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
}

// --------------------
// Multer - fotos
// --------------------
const photoStorage = multer.diskStorage({
  destination: photoDir,
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, "_")),
});
const uploadPhoto = multer({ storage: photoStorage });

// --------------------
// Multer - documentos
// --------------------
const documentStorage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, "_")),
});
const uploadDocument = multer({ storage: documentStorage });

// --------------------
// Registro
// --------------------
app.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "Todos los campos son obligatorios" });

  try {
    const hashed = await bcrypt.hash(password, 10);
    await db.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      hashed,
    ]);
    res.json({ message: "Usuario registrado exitosamente" });
  } catch (err) {
    console.error(err);
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error: "El usuario ya existe" });
    } else {
      res.status(500).json({ error: "Error al registrar usuario" });
    }
  }
});

// --------------------
// Login
// --------------------
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email y contraseña requeridos" });

  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(401).json({ error: "No existe el usuario" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el login" });
  }
});

// --------------------
// Obtener perfil
// --------------------
app.get("/user/profile", authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [req.user.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener perfil" });
  }
});

// --------------------
// Actualizar perfil + foto
// --------------------
app.put("/user/profile", authMiddleware, uploadPhoto.single("photo"), async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const photoPath = req.file ? req.file.path : req.body.photo; // mantener foto existente si no suben nueva

    await db.execute(
      "UPDATE users SET name=?, phone=?, address=?, photo=? WHERE id=?",
      [name, phone, address, photoPath, req.user.id]
    );

    res.json({ message: "Perfil actualizado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar perfil" });
  }
});

// --------------------
// Subir documento PDF
// --------------------
app.post(
  "/upload/document",
  authMiddleware,
  uploadDocument.single("document"),
  async (req, res) => {
    if (!req.file)
      return res.status(400).json({ error: "No se subió ningún archivo" });

    try {
      await db.execute("UPDATE users SET document_path=? WHERE id=?", [
        req.file.path,
        req.user.id,
      ]);
      res.json({ message: "Documento subido", path: req.file.path });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al subir documento" });
    }
  }
);

// --------------------
// Iniciar servidor
// --------------------
app.listen(3000, () => console.log("Servidor escuchando en http://localhost:3000"));
