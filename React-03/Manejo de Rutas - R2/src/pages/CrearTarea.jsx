import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CrearTarea({ tareas, setTareas }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  // Validar campos obligatorios
  const validar = () => {
    const errores = {};
    if (!title.trim()) errores.title = "El título es obligatorio";
    if (!description.trim()) errores.description = "La descripción es obligatoria";
    return errores;
  };

  // Agregar nueva tarea
  const agregarTarea = () => {
    const errores = validar();
    if (Object.keys(errores).length > 0) {
      setErrors(errores);
      return;
    }

    const nueva = {
      id: tareas.length + 1,
      title,
      description,
      fecha: new Date().toISOString().split("T")[0],
      completed,
      active: true
    };

    setTareas([...tareas, nueva]);
    setMensaje(`Tarea "${title}" creada correctamente`);
    setTimeout(() => setMensaje(""), 3000);

    // Limpiar campos del formulario
    setTitle("");
    setDescription("");
    setCompleted(false);

    // Redirigir al listado después de 2 segundos
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="card p-4 mx-auto mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-3">Crear Tarea</h2>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      <input
        className="form-control mb-2"
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      {errors.title && <p className="text-danger">{errors.title}</p>}

      <textarea
        className="form-control mb-2"
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      {errors.description && <p className="text-danger">{errors.description}</p>}

      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          checked={completed}
          onChange={e => setCompleted(e.target.checked)}
          id="completedCheck"
        />
        <label className="form-check-label" htmlFor="completedCheck">
          Completada
        </label>
      </div>

      <button className="btn btn-success w-100" onClick={agregarTarea}>
        Agregar Tarea
      </button>
    </div>
  );
}
