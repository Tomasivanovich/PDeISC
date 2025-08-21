import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditarTarea({ tareas, setTareas }) {
  const { id } = useParams(); // Obtener el id de la tarea desde la URL
  const navigate = useNavigate(); // Hook para redirigir a otra ruta

  // Buscar la tarea por id en el arreglo de tareas
  const tarea = tareas.find(t => t.id === Number(id));

  // Estados locales para los campos del formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState({}); // Errores de validación
  const [mensaje, setMensaje] = useState(""); // Mensaje de éxito

  // Cuando se carga el componente, si la tarea existe, inicializamos los campos
  useEffect(() => {
    if (tarea) {
      setTitle(tarea.title);
      setDescription(tarea.description);
      setCompleted(tarea.completed);
    }
  }, [tarea]);

  // Función para validar los campos del formulario
  const validar = () => {
    const errores = {};
    if (!title.trim()) errores.title = "El título es obligatorio";
    if (!description.trim()) errores.description = "La descripción es obligatoria";
    return errores;
  };

  // Función para guardar los cambios de la tarea
  const guardarCambios = () => {
    const errores = validar(); // Validamos los campos
    if (Object.keys(errores).length > 0) {
      setErrors(errores); 
      return;
    }

    // Actualizamos la tarea en el arreglo
    setTareas(prev =>
      prev.map(t => t.id === tarea.id ? { ...t, title, description, completed } : t)
    );

    setMensaje(`Tarea "${title}" actualizada correctamente`);
    setTimeout(() => setMensaje(""), 3000); 

    // Redirige al listado de tareas después de 2s
    setTimeout(() => navigate("/"), 2000);
  };

  // Si no se encuentra la tarea, se muestra un mensaje de error
  if (!tarea) {
    return <div className="alert alert-danger text-center mt-4">Tarea no encontrada</div>;
  }

  return (
    <div className="card p-4 mx-auto mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-3">Editar Tarea</h2>

      {/* Mensaje de éxito */}
      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      {/* Campo de título */}
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      {errors.title && <p className="text-danger">{errors.title}</p>}

      {/* Campo de descripción */}
      <textarea
        className="form-control mb-2"
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      {errors.description && <p className="text-danger">{errors.description}</p>}

      {/* Checkbox de completada */}
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

      {/* Botón para guardar los cambios */}
      <button className="btn btn-success w-100" onClick={guardarCambios}>
        Guardar Cambios
      </button>
    </div>
  );
}
