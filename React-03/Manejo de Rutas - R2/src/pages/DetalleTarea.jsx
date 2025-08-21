import { useParams } from "react-router-dom";

export default function DetalleTarea({ tareas }) {
  const { id } = useParams();

  // Buscar la tarea por id
  const tarea = tareas.find(t => t.id === Number(id));

  // Mostrar mensaje si no se encuentra la tarea
  if (!tarea) 
    return <div className="alert alert-danger text-center mt-4">Tarea no encontrada</div>;

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: "600px" }}>
      <h2 className="card-title mb-3">{tarea.title}</h2>
      <p><strong>Descripción:</strong> {tarea.description}</p>
      <p><strong>Fecha:</strong> {tarea.fecha}</p>
      <p>
        <strong>Estado:</strong> 
        <span className={tarea.completed ? 'text-warning' : 'text-success'}>
          {tarea.completed ? "Incompleta" : "Completa"}
        </span>
      </p>
      <p><strong>Activo:</strong> {tarea.active ? "Sí" : "No"}</p>
    </div>
  );
}
