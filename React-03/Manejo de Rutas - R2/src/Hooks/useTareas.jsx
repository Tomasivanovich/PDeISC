import { useState, useEffect } from "react";

export function useTareas() {
  const [tareas, setTareas] = useState(() => {
    // Cargar tareas guardadas en localStorage al iniciar
    const saved = localStorage.getItem("tareas");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Guardar tareas en localStorage cada vez que cambian
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  return [tareas, setTareas];
}
