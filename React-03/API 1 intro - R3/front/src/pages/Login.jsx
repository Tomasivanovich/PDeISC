import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css"

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", { email, password });
      const data = res.data;

      if (!data.success) {
        setError(data.message);
        return;
      }

      // Guardamos en estado y localStorage
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirigir según rol
      if (data.user.role === "admin") navigate("/usuarios");
      else navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Error, usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login">
      <h2>Iniciar sesión</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>

      {/* En caso de no tener usuario */}
      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        ¿No tienes usuario? <Link to="/crear-usuario">Crea uno aquí</Link>
      </p>
    </div>
  );
}

export default Login;
