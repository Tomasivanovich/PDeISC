import { useEffect } from "react";
import "animate.css/animate.min.css";

export default function Toast({ show, message, type = "success", onClose, duration = 3000 }) {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div
      className={`position-fixed top-0 end-0 m-3 p-2 rounded text-white ${
        type === "success" ? "bg-success" : "bg-danger"
      } animate__animated animate__fadeInDown`}
      style={{ zIndex: 9999, minWidth: "250px" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white ms-2"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
