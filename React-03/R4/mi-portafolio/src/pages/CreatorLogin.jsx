import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterCreatorForm from "../components/RegisterCreatorForm";
import useApi from "../hooks/useApi";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "../components/Toast";

export default function CreatorLogin() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [toast, setToast] = useState({ show: false, message: "", type: "danger" });
  const navigate = useNavigate();
  const api = useApi();

  const showToast = (message, type = "danger") =>
    setToast({ show: true, message, type });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api.post("/api/creators/login", form);

      if (!data.creator) {
        showToast("Error: no se recibió información del creador");
        return;
      }

      localStorage.setItem("token", data.token);
      showToast("✅ Login exitoso", "success");
      navigate(`/portfolio/${data.creator.id}`);
    } catch (err) {
      console.error("❌ Error en login:", err);
      showToast(err.message || "Error de conexión con el servidor");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 animate__animated animate__fadeIn"
      style={{
        background: "linear-gradient(135deg, #0d6efd, #20c997, #6610f2)",
        backgroundSize: "300% 300%",
        animation: "gradientBG 8s ease infinite",
      }}
    >
      {/* Toast */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: "", type: toast.type })}
      />

      {isRegister ? (
        <RegisterCreatorForm
          role="creator"
          onRegister={(data) => {
            if (!data || !data.creator) {
              showToast("Error: no se recibió información del creador");
              return;
            }
            localStorage.setItem("token", data.token);
            showToast("✅ Registro exitoso", "success");
            navigate(`/portfolio/${data.creator.id}`);
          }}
        />
      ) : (
        <div className="card p-5 shadow-lg rounded-4 bg-white bg-opacity-90 animate__animated animate__fadeIn" style={{ minWidth: "350px", maxWidth: "400px" }}>
          <h2 className="mb-4 text-center fw-bold text-primary">Login de Creador</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Correo"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Contraseña"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-lg w-100"
            >
              Ingresar
            </button>
          </form>
          <p className="text-center mt-3 mb-0">
            ¿No tenés cuenta?{" "}
            <span
              onClick={() => setIsRegister(true)}
              style={{ cursor: "pointer", color: "#0d6efd", fontWeight: "500" }}
            >
              Registrarse
            </span>
          </p>
        </div>
      )}

      <style>
        {`
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
}
