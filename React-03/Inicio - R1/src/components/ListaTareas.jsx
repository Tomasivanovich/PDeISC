import { useState } from 'react'; //Importamos useState para poder guardar el estado

export function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [estado, setEstado] = useState('Pendiente'); 

  const agregarTarea = () => {

    const nueva = {
      id: tareas.length + 1,
      title: nuevaTarea,
      state: estado
    };

    setTareas([...tareas, nueva]);
    setNuevaTarea('');
    setEstado('Pendiente'); 
  };

  return (
    <div className="tarjeta">
      <h2>Lista de Tareas</h2>

      <input
        type="text"
        placeholder="Escribe una tarea..."
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
      />

      <select value={estado} onChange={(e) => setEstado(e.target.value)}>
        <option value="Pendiente">Pendiente</option>
        <option value="En Progreso">En Progreso</option>
        <option value="Completada">Completada</option>
      </select>

      <button onClick={agregarTarea}>Agregar</button>

      <ul>
        {tareas.map((t) => (
          <li key={t.id}>
            <span
              style={{
                color: t.state === 'Completada' ? 'green' : 'orange'
              }}
            >
                {t.title} — {t.state}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
