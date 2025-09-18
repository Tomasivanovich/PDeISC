import { useState } from "react";
import useApi from "../hooks/useApi";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "./Toast";

export default function RegisterCreatorForm({ role, onRegister }) {
  const api = useApi();
  const [form, setForm] = useState({
    name: "",
    title: "",
    email: "",
    password: "",
  });

  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const showToast = (message, type = "success") => setToast({ show: true, message, type });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // -----------------------------
    // Validaciones
    // -----------------------------
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const titleRegex = /^[A-Za-z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(form.name)) {
      showToast("El nombre debe tener al menos 3 letras y no contener números", "danger");
      return;
    }

    if (!titleRegex.test(form.title)) {
      showToast("El título debe tener al menos 3 letras y no contener números", "danger");
      return;
    }

    if (!emailRegex.test(form.email)) {
      showToast("El correo electrónico no es válido", "danger");
      return;
    }

    try {
      const data = await api.post("/api/creators/register", form);
      showToast("✅ Registro exitoso", "success");
      if (onRegister) onRegister(data);
    } catch (err) {
      showToast(err.message || "Error al registrarse", "danger");
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="container mt-4">
      <h2 className="mb-3 animate__animated animate__fadeIn">
        Registro de {role === "creator" ? "Creador" : "Usuario"}
      </h2>

      {/* Toast */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: "", type: toast.type })}
      />

      <form onSubmit={handleSubmit} className="animate__animated animate__fadeIn">
        <input
          type="text"
          name="name"
          className="form-control mb-2"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          className="form-control mb-2"
          placeholder="Título profesional"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          className="form-control mb-2"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          className="form-control mb-2"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary w-100">
          Registrarse
        </button>
      </form>
    </div>
  );
}
