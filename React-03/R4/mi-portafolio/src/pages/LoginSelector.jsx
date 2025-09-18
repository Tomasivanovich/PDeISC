import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";

export default function LoginSelector() {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 animate__animated animate__fadeIn"
      style={{
        background: "linear-gradient(135deg, #0d6efd, #20c997, #6610f2)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 10s ease infinite",
      }}
    >
      <div className="card shadow-lg p-5 text-center border-0 bg-white bg-opacity-85 rounded-5" style={{ minWidth: "350px", maxWidth: "450px" }}>
        <h2 className="mb-4 fw-bold text-primary">Selecciona tu rol</h2>
        <p className="text-muted mb-4">
          Ingresa como creador para gestionar tu portafolio o como visitante para explorar.
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/login/creator">
            <button className="btn btn-primary btn-lg px-4 py-2 shadow animate__animated animate__bounceIn"
                    style={{ transition: "all 0.3s" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              👨‍💻 Soy Creador
            </button>
          </Link>
          <Link to="/login/visitor">
            <button className="btn btn-success btn-lg px-4 py-2 shadow animate__animated animate__bounceIn animate__delay-1s"
                    style={{ transition: "all 0.3s" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              👤 Soy Visitante
            </button>
          </Link>
        </div>
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
