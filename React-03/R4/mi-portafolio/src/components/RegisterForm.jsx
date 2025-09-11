import { useState } from "react";

export default function RegisterForm({ role, onRegister }) {
  const [form, setForm] = useState({
    name: "",
    title: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/creators/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al registrarse");
        return;
      }

      console.log("✅ Registro exitoso:", data);
      if (onRegister) onRegister(data); // redirige y guarda token
    } catch (err) {
      console.error("❌ Error en registro:", err);
    }
  };

  return (
    <div className="register-box">
      <h2>Registro de {role === "creator" ? "Creador" : "Usuario"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Título profesional"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
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
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
