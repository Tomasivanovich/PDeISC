import { useState } from "react";
import useApi from "../hooks/useApi";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";

export default function VisitorSearchPortfolio() {
  const api = useApi("visitor_token");
  const [email, setEmail] = useState("");
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPortfolio(null);

    try {
      const data = await api.get(`/api/portfolio/${email}`);
      setPortfolio(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al obtener portafolio");
    }
  };

  return (
    <div
      className="container py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
      }}
    >
      {/* Formulario de búsqueda */}
      <div className="card p-5 mx-auto shadow-lg rounded-4 animate__animated animate__fadeIn" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Buscar Portafolio</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control form-control-lg mb-3"
            placeholder="Email del creador"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn btn-primary w-100 btn-lg shadow animate__animated animate__pulse animate__infinite"
            style={{ transition: "all 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Buscar
          </button>
        </form>

        {error && (
          <div className="alert alert-danger mt-3 animate__animated animate__shakeX" role="alert">
            {error}
          </div>
        )}
      </div>

      {/* Resultados del portafolio */}
      {portfolio && (
        <div className="mt-5 animate__animated animate__fadeIn">
          {/* Información del creador */}
          <div className="card p-4 mb-4 shadow-sm rounded-4">
            <h2 className="fw-bold">{portfolio.creator.name}</h2>
            <p className="text-muted">{portfolio.creator.title}</p>
            <p className="text-muted">{portfolio.creator.bio}</p>
            <p className="text-muted">{portfolio.creator.phone}</p>
            <p className="text-muted">{portfolio.creator.profile_image}</p>
            <img
              src={creator.profile_image}
              alt="Perfil"
              className="img-thumbnail mb-2"
              style={{ width: "120px" }}
            />
          )}
          </div>

          {/* Experiencia */}
          <div className="card p-3 mb-4 shadow-sm rounded-4">
            <h3 className="fw-bold mb-3">Experiencia</h3>
            <ul className="list-group list-group-flush">
              {portfolio.experience.map((e) => (
                <li key={e.id} className="list-group-item">
                  <b>{e.company}</b> - {e.role} ({e.year_start} - {e.year_end || "Presente"})
                </li>
              ))}
            </ul>
          </div>

          {/* Proyectos */}
          <div className="card p-3 mb-4 shadow-sm rounded-4">
            <h3 className="fw-bold mb-3">Proyectos</h3>
            <ul className="list-group list-group-flush">
              {portfolio.projects.map((p) => (
                <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span><b>{p.title}</b></span>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                      🔗 Ver
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className="card p-3 mb-4 shadow-sm rounded-4">
            <h3 className="fw-bold mb-3">Skills</h3>
            <ul className="list-group list-group-flush">
              {portfolio.skills.map((s) => (
                <li key={s.id} className="list-group-item">
                  {s.name} - Nivel {s.level}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
