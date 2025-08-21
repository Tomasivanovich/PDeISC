import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TareaItem({ tarea, setTareas }) {
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const toggleActive = () => {
    setTareas(prev =>
      prev.map(t => t.id === tarea.id ? { ...t, active: !t.active } : t)
    );
    setMensaje(`Tarea "${tarea.title}" ${tarea.active ? 'desactivada' : 'activada'}`);
    setTimeout(() => setMensaje(""), 3000);
  };

  const toggleCompleted = () => {
    setTareas(prev =>
      prev.map(t => t.id === tarea.id ? { ...t, completed: !t.completed } : t)
    );
    setMensaje(`Tarea "${tarea.title}" marcada como ${tarea.completed ? "incompleta" : "completa"}`);
    setTimeout(() => setMensaje(""), 3000);
  };

  const borrarTarea = () => {
    setTareas(prev => prev.filter(t => t.id !== tarea.id));
    setMensaje(`Tarea "${tarea.title}" eliminada`);
    setTimeout(() => setMensaje(""), 3000);
  };

  const claseTitulo = `
    fw-bold 
    ${tarea.completed ? 'text-warning' : 'text-success'}
    ${!tarea.active ? 'text-decoration-line-through text-muted' : ''}
  `;

  const descripcionCorta = (texto, max = 50) => {
    return texto.length > max ? texto.slice(0, max) + "…" : texto;
  };

  return (
    <li className={`list-group-item d-flex justify-content-between align-items-start ${!tarea.active ? 'list-group-item-secondary' : ''}`}>
      <div className="ms-2 me-auto">
        <Link to={`/tarea/${tarea.id}`} className={claseTitulo}>
          {tarea.title}
        </Link>
        <p className={`mb-1 ${!tarea.active ? 'text-decoration-line-through text-muted' : ''}`}>
          {descripcionCorta(tarea.description, 50)}
        </p>
        {mensaje && <div className="alert alert-info py-1 mt-1">{mensaje}</div>}
      </div>
      <div className="btn-group btn-group-sm flex-column flex-md-row">
        <button className="btn btn-warning mb-1 mb-md-0 me-md-1" onClick={toggleCompleted}>
          {tarea.completed ? "Incompleta" : "Completa"}
        </button>
        <button className="btn btn-info mb-1 mb-md-0 me-md-1" onClick={toggleActive}>
          {tarea.active ? "Desactivar" : "Activar"}
        </button>
        <button className="btn btn-secondary mb-1 mb-md-0 me-md-1" onClick={() => navigate(`/editar/${tarea.id}`)}>
          Editar
        </button>
        <button className="btn btn-danger" onClick={borrarTarea}>Borrar</button>
      </div>
    </li>
  );
}
