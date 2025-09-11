import { useState } from "react";

export default function VisitorLogin() {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📌 Visitante logueado/registrado:", form);
    // fetch("http://localhost:4000/api/visitors", { ... })
  };

  return (
    <div className="login-box">
      <h2>Login de Visitante</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tu nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}