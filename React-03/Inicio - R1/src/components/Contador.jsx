import { useState } from 'react'; //Importamos useState para poder guardar el estado

export function Contador() {
  const [count, setCount] = useState(0);

  const handleClick = () => setCount(prev => prev + 1); //funcion que suma 1 al contador al hacer click

  return (
    <div className="contador-container">
      <h3>Contador</h3>
      <button className="boton contador-boton" onClick={handleClick}>
        {count}
      </button>
    </div>
  );
}
