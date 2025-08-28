// Importar dependencias
const express = require('express'); 
const mysql = require('mysql2'); // Cliente MySQL
const cors = require('cors'); // Middleware para habilitar CORS
const bodyParser = require('body-parser'); // Middleware para parsear JSON


const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Permitir solicitudes desde cualquier origen
app.use(bodyParser.json()); // Parsear cuerpos de solicitudes como JSON

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'usuarios_db' // Nombre de la base de datos
});

// Conexión a la base de datos
db.connect(err => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL!');
});

// Rutas

// Ruta raíz
app.get('/', (req, res) => {
  res.send('API de Usuarios funcionando en http://localhost:3001/usuarios');
});

// Obtener todos los socios
app.get('/usuarios', (req, res) => {
  const sql = `
    SELECT id, nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email, password, created_at, updated_at
    FROM usr
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.log('Error SQL:', err);
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    res.json(results);
  });
});

// Crear un nuevo socio con validaciones
app.post('/usuarios', (req, res) => {
  const { nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email, password } = req.body;

  // Validaciones básicas
  if (!nombre || !apellido || !email || !password) {
    return res.status(400).json({ error: 'Campos obligatorios incompletos.' });
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email inválido.' });
  }

  // Validar fecha de nacimiento
  let fechaNac = fecha_nacimiento ? fecha_nacimiento : null;
  if (fechaNac) {
    const fecha = new Date(fechaNac);
    const hoy = new Date();
    if (fecha > hoy) {
      return res.status(400).json({ error: 'La fecha de nacimiento no puede ser futura.' });
    }
  }

  // SQL para insertar usuario
  const sql = `
    INSERT INTO usr (nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Ejecutar consulta
  db.query(sql, [
    nombre,
    apellido,
    direccion || null,
    telefono || null,
    celular || null,
    fechaNac,
    email,
    password
  ], (err, results) => {
    if (err) {
      console.log('Error SQL:', err);
      return res.status(500).json({ error: 'Error al crear usuario' });
    }
    res.json({ message: 'Usuario creado', id: results.insertId });
  });
});

// Actualizar usuario por ID
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email, password } = req.body;

  const sql = `
    UPDATE usr
    SET nombre=?, apellido=?, direccion=?, telefono=?, celular=?, fecha_nacimiento=?, email=?, password=?
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
    id
  ], (err) => {
    if (err) {
      console.log('Error SQL:', err);
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
      console.log('Error SQL:', err);
      return res.status(500).json({ error: 'Error al eliminar usuario' });
    }
    res.json({ message: 'Usuario eliminado' });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
