import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisitorRegister from "../components/VisitorRegister";
import useApi from "../hooks/useApi";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";

export default function VisitorLogin() {
  const api = useApi("visitor_token");
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [toast, setToast] = useState({ show: false, message: "", type: "danger" });
  const navigate = useNavigate();

  const showToast = (message, type = "danger") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api.post("/api/visitors/login", form);

      if (!data.visitor) {
        showToast("Error: no se recibió información del visitante", "danger");
        return;
      }

      localStorage.setItem("visitor_token", data.token);
      showToast("✅ Login exitoso", "success");
      navigate(`/visitor/search`);
    } catch (err) {
      console.error("❌ Error en login:", err);
      showToast(err.message || "Error de conexión con el servidor", "danger");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 animate__animated animate__fadeIn"
      style={{
        background: "linear-gradient(135deg, #20c997, #0d6efd, #6610f2)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 10s ease infinite",
      }}
    >
      {/* Toast */}
      {toast.show && (
        <div
          className={`toast align-items-center text-bg-${toast.type} border-0 animate__animated animate__fadeInDown position-fixed top-0 end-0 m-3`}
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">{toast.message}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setToast({ show: false, message: "", type: toast.type })}
            ></button>
          </div>
        </div>
      )}

      <div className="card p-5 shadow-lg rounded-4 bg-white bg-opacity-90 animate__animated animate__fadeIn" style={{ maxWidth: "400px" }}>
        {isRegister ? (
          <VisitorRegister
            onRegistered={(data) => {
              if (!data?.visitor) {
                showToast("Error: no se recibió información del visitante", "danger");
                return;
              }
              localStorage.setItem("visitor_token", data.token);
              showToast("✅ Registro exitoso", "success");
              navigate(`/visitor/search`);
            }}
          />
        ) : (
          <>
            <h2 className="text-center mb-4 animate__animated animate__fadeInDown fw-bold text-primary">
              Login de Visitante
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control form-control-lg mb-3"
                placeholder="Correo"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                type="password"
                className="form-control form-control-lg mb-4"
                placeholder="Contraseña"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type="submit"
                className="btn btn-success btn-lg w-100 shadow animate__animated animate__pulse animate__infinite"
                style={{ transition: "all 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                Ingresar
              </button>
            </form>
          </>
        )}

        <p className="text-center mt-3 mb-0">
          {isRegister ? "¿Ya tenés cuenta?" : "¿No tenés cuenta?"}{" "}
          <span
            onClick={() => {
              setIsRegister(!isRegister);
              setToast({ show: false, message: "", type: "danger" });
            }}
            style={{ cursor: "pointer", color: "#0d6efd", textDecoration: "underline", fontWeight: "500" }}
          >
            {isRegister ? "Iniciar sesión" : "Registrarse"}
          </span>
        </p>
      </div>

      {/* Animación del gradiente */}
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
