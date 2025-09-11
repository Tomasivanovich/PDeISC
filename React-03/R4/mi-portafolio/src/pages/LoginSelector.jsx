import { Link } from "react-router-dom";

export default function LoginSelector() {
  return (
    <div className="login-selector">
      <h2>Selecciona tu rol</h2>
      <Link to="/login/creator">
        <button>👨‍💻 Soy Creador</button>
      </Link>
      <Link to="/login/visitor">
        <button>👤 Soy Visitante</button>
      </Link>
    </div>
  );
}
