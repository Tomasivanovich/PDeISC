// Importacion de modulos
import express from "express";  // <-- Importación del módulo express para crear un servidor HTTP
import bcrypt from "bcrypt";    // <-- Importación del módulo bcrypt para encriptar contraseñas

// Creación del servidor HTTP
const app = express();  

// Definimos la ruta de tipo GET para la raíz "/"
app.get("/", (req, res) => {
  const password = "jordan23"; // Contraseña a encriptar
  const saltRounds = 10; // Número de rondas para generar el 'salt' (entre más rondas, más seguro pero más lento)

  // Encriptamos la contraseña usando bcrypt
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) { 
      // Si ocurre un error durante la encriptación, lo mostramos en la consola y enviamos un error al cliente
      console.error("Error al encriptar:", err);
      return res.status(500).send("Error al encriptar la contraseña");
    }

    // Si la encriptación fue exitosa, respondemos al cliente con el hash generado
    res.send(`Hash generado: ${hash}`);
  });
});

// El servidor escucha en el puerto 3000
app.listen(3000, () => {
  // Se imprime un mensaje en la consola indicando que el servidor está corriendo en el puerto 3000
  console.log("http://localhost:3000");
});
