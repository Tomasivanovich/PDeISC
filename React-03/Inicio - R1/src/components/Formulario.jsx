import { useState } from 'react'; //Importamos useState para poder guardar el estado
 
export function Formulario() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState('');

  const agregarUsuario = () => {
    if (!nuevoUsuario.trim()) return;

    const nuevo = {
      usuario: nuevoUsuario,
    };

    setUsuarios([...usuarios, nuevo]);
    setNuevoUsuario('');
  };

  return (
    <div className="tarjeta">
      <h2>Usuario</h2>

      <input
        type="text"
        placeholder="Escribe un nombre..."
        value={nuevoUsuario}
        onChange={(e) => setNuevoUsuario(e.target.value)}
      />

      <button onClick={agregarUsuario}>Agregar</button>

      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            <span>
              <div>Bienvenido {u.usuario}</div>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
