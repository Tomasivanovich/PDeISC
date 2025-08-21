import TareaItem from "../components/TareaItem";

export default function ListaTareas({ tareas, setTareas }) {
  return (
    <div>
      <h1 className="text-center mb-4">Lista de Tareas</h1>

      {tareas.length === 0 ? (
        // Mensaje si no hay tareas
        <div className="alert alert-warning text-center">No hay tareas creadas</div>
      ) : (
        <ul className="list-group">
          {tareas.map(t => (
            <TareaItem key={t.id} tarea={t} setTareas={setTareas} />
          ))}
        </ul>
      )}
    </div>
  );
}
