import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

export default function CreatorLogin() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // ----------------------------
  // Función para login
  // ----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/creators/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("Login response:", data);

      if (!res.ok) {
        alert(data.error || "Error en login");
        return;
      }

      if (!data.creator) {
        alert("Error: no se recibió información del creador");
        return;
      }

      // Guardar token en localStorage
      localStorage.setItem("token", data.token);

      // Redirigir al portafolio
      navigate(`/portfolio/${data.creator.id}`);
    } catch (err) {
      console.error("❌ Error en fetch:", err);
      alert("Error de conexión con el servidor");
    }
  };

  // ----------------------------
  // Renderizado
  // ----------------------------
  return (
    <div className="login-box">
      {isRegister ? (
        <RegisterForm
          role="creator"
          onRegister={(data) => {
            console.log("Registro response:", data);

            if (!data || !data.creator) {
              alert("Error: no se recibió información del creador");
              return;
            }

            // Guardar token y redirigir automáticamente
            localStorage.setItem("token", data.token);
            navigate(`/portfolio/${data.creator.id}`);
          }}
        />
      ) : (
        <>
          <h2>Login de Creador</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Correo"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button type="submit">Ingresar</button>
          </form>
        </>
      )}

      <p>
        {isRegister ? "¿Ya tenés cuenta?" : "¿No tenés cuenta?"}{" "}
        <span
          onClick={() => setIsRegister(!isRegister)}
          style={{ cursor: "pointer", color: "blue" }}
        >
          {isRegister ? "Iniciar sesión" : "Registrarse"}
        </span>
      </p>
    </div>
  );
}
