import { useState } from "react";
import useApi from "../hooks/useApi";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "./Toast";

export default function VisitorRegister({ onRegistered }) {
  const api = useApi();
  const [form, setForm] = useState({ email: "", password: "" });
  const [toast, setToast] = useState({ show: false, message: "", type: "danger" });

  const showToast = (message, type = "danger") => setToast({ show: true, message, type });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ------------------------
    // Validaciones básicas
    // ------------------------
    if (!form.email.includes("@")) {
      showToast("Debe ingresar un email válido");
      return;
    }
    if (form.password.length < 6) {
      showToast("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const data = await api.post("/api/visitors/register", form);
      showToast("✅ Registro exitoso", "success");
      onRegistered(data);
    } catch (err) {
      console.error(err);
      showToast(err.message || "Error al registrar visitante");
    }
  };

  return (
    <div className="container mt-3">
      {/* Toast */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: "", type: toast.type })}
      />

      <form onSubmit={handleSubmit} className="animate__animated animate__fadeIn">
        <input
          name="email"
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
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
