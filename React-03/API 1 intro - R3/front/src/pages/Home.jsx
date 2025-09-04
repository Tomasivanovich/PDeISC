import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="home-page">
      <h1>Bienvenido {user?.nombre || "invitado"} 👋</h1>
      <p>
        {user
          ? `Has iniciado sesión como ${user.role === "admin" ? "Administrador" : "Usuario"}`
          : "Por favor, inicia sesión para acceder a todas las funciones."}
      </p>

      {user && (
        <div className="user-info">
          <h3>Información de tu cuenta</h3>
          <p><strong>Nombre:</strong> {user.nombre} {user.apellido}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Dirección:</strong> {user.direccion || "No registrada"}</p>
          <p><strong>Teléfono:</strong> {user.telefono || "No registrado"}</p>
          <p><strong>Celular:</strong> {user.celular || "No registrado"}</p>
          <p><strong>Fecha de nacimiento:</strong> {user.fecha_nacimiento ? new Date(user.fecha_nacimiento).toLocaleDateString() : "No registrada"}</p>
          <p><strong>Rol:</strong> {user.role}</p>
          <p><strong>Última actualización:</strong> {user.updated_at ? new Date(user.updated_at).toLocaleString() : "N/A"}</p>
        </div>
      )}

      <div className="home-actions">
        {user && <button onClick={handleLogout}>Cerrar sesión</button>}
      </div>
    </div>
  );
}

export default Home;
