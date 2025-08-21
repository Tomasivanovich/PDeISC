import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ListaTareas from "./pages/ListaTareas";
import DetalleTarea from "./pages/DetalleTarea";
import CrearTarea from "./pages/CrearTarea";
import { useTareas } from "./Hooks/useTareas"; // Hook para guardar las tareas en localStorage
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [tareas, setTareas] = useTareas(); // Estado global de tareas

  return (
    <BrowserRouter>
      <div className="container mt-4">

        {/* Navbar responsive */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounded mb-4">
          <div className="container-fluid">

            {/* Botón hamburguesa para móviles */}
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Enlaces centrados */}
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
              <ul className="navbar-nav text-center">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/crear">Crear Tarea</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Rutas principales */}
        <Routes>
          <Route path="/" element={<ListaTareas tareas={tareas} setTareas={setTareas} />} />
          <Route path="/tarea/:id" element={<DetalleTarea tareas={tareas} />} />
          <Route path="/crear" element={<CrearTarea tareas={tareas} setTareas={setTareas} />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
