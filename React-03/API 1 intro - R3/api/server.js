// ------------------------- DEPENDENCIAS -------------------------
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// ------------------------- MIDDLEWARE -------------------------
app.use(cors());
app.use(bodyParser.json());

// ------------------------- BASE DE DATOS -------------------------
const db = mysql.createConnection({
  host: '127.0.0.1', 
  user: 'root',
  password: '', 
  database: 'usuarios_db',
  port: 3306
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a MySQL:', err.message);
    process.exit(1); // detiene el servidor si no conecta
  }
  console.log('Conectado a la base de datos MySQL!');
});

// ------------------------- RUTAS -------------------------

// Ruta raíz
app.get('/', (req, res) => {
  res.send('API de Usuarios funcionando en http://localhost:3001/usuarios');
});

// ----------- USUARIOS -----------

// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  const sql = `
    SELECT id, nombre, apellido, direccion, telefono, celular, 
           fecha_nacimiento, email, role, created_at, updated_at 
    FROM usr
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err.message);
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    res.json(results);
  });
});

// Crear un usuario
app.post('/usuarios', (req, res) => {
  const { nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email, password, role } = req.body;

  if (!nombre || !apellido || !email || !password) {
    return res.status(400).json({ error: 'Campos obligatorios incompletos.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email inválido.' });
  }

  let fechaNac = fecha_nacimiento || null;
  if (fechaNac && new Date(fechaNac) > new Date()) {
    return res.status(400).json({ error: 'La fecha de nacimiento no puede ser futura.' });
  }

  const sql = `
    INSERT INTO usr (nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email, password, role)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    nombre,
    apellido,
    direccion || null,
    telefono || null,
    celular || null,
    fechaNac,
    email,
    password,
    role || 'user'
  ], (err, results) => {
    if (err) {
      console.error('Error al crear usuario:', err.message);
      return res.status(500).json({ error: 'Error al crear usuario' });
    }
    res.json({ message: 'Usuario creado', id: results.insertId });
  });
});

// Actualizar usuario por ID
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email, password, role } = req.body;

  const sql = `
    UPDATE usr
    SET nombre=?, apellido=?, direccion=?, telefono=?, celular=?, fecha_nacimiento=?, email=?, password=?, role=?
    WHERE id=?
  `;

  db.query(sql, [
    nombre,
    apellido,
    direccion || null,
    telefono || null,
    celular || null,
    fecha_nacimiento || null,
    email,
    password,
    role || 'user',
    id
  ], (err) => {
    if (err) {
      console.error('Error al actualizar usuario:', err.message);
      return res.status(500).json({ error: 'Error al actualizar usuario' });
    }
    res.json({ message: 'Usuario actualizado' });
  });
});

// Eliminar usuario por ID
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usr WHERE id=?', [id], (err) => {
    if (err) {
      console.error('Error al eliminar usuario:', err.message);
      return res.status(500).json({ error: 'Error al eliminar usuario' });
    }
    res.json({ message: 'Usuario eliminado' });
  });
});

// ----------- LOGIN -----------

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Faltan credenciales' });
  }

  const sql = 'SELECT id, nombre, apellido, email, password, role FROM usr WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Error en login:', err.message);
      return res.status(500).json({ success: false, message: 'Error de servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }

    // Respuesta consistente para React
    res.json({
      success: true,
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        role: user.role || 'user'
      }
    });
  });
});

// ------------------------- SERVIDOR -------------------------
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
