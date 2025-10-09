const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rn1'
});

db.connect(err => {
  if(err){
    console.log('Error al conectar a MySQL:', err);
  } else {
    console.log('Conectado a MySQL');
  }
});

// Endpoint login 
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if(!username || !password){
    return res.json({ success: false, message: 'Datos incompletos' });
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if(err){
      return res.json({ success: false, message: 'Error en la consulta' });
    }

    if(results.length === 0){
      return res.json({ success: false, message: 'Usuario no encontrado' });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
      return res.json({ success: false, message: 'Contraseña incorrecta' });
    }

    return res.json({ success: true, user: { id: user.id, username: user.username } });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
