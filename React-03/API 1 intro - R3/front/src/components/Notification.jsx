import React from 'react';
import '../styles/Notification.css';

// Recibe dos props: 
// - message: el texto que se mostrará en la notificación
// - type: el tipo de notificación (por ejemplo: 'success', 'error', 'info')
export const Notification = ({ message, type }) => {

  // Si no hay mensaje, no se renderiza nada 
  if (!message) return null;

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};
