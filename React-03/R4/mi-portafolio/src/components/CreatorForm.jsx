import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "./Toast"; // <-- Importar componente

export default function CreatorForm({ creatorId, onSave }) {
  const { request } = useApi();
  const [form, setForm] = useState({
    name: "",
    title: "",
    bio: "",
    profile_image: "",
    email: "",
    password: "",
    phone: "",
    linkedin: "",
    github: "",
  });
  const [creator, setCreator] = useState(null);
  const [isEditing, setIsEditing] = useState(true);

  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  // ----------------------------
  // Cargar creador existente
  // ----------------------------
  useEffect(() => {
    if (!creatorId) return;

    const fetchCreator = async () => {
      const data = await request(`/api/creators/${creatorId}`, "GET");
      if (!data || data.error) {
        showToast(data?.error || "Error al cargar creador", "danger");
        return;
      }

      setForm({
        name: data.name || "",
        title: data.title || "",
        bio: data.bio || "",
        profile_image: data.profile_image || "",
        email: data.email || "",
        password: "",
        phone: data.phone || "",
        linkedin: data.linkedin || "",
        github: data.github || "",
      });
      setCreator(data);
      setIsEditing(false);
    };

    fetchCreator();
  }, [creatorId]);

  // ----------------------------
  // Validaciones de campos
  // ----------------------------
  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const titleRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^[0-9]+$/;
    const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;

    if (!nameRegex.test(form.name)) {
      showToast("El nombre debe tener al menos 3 letras y no contener números.", "danger");
      return false;
    }
    if (!titleRegex.test(form.title)) {
      showToast("El título no puede contener números.", "danger");
      return false;
    }
    if (!phoneRegex.test(form.phone)) {
      showToast("El teléfono debe contener solo números.", "danger");
      return false;
    }
    if (form.linkedin && !urlRegex.test(form.linkedin)) {
      showToast("El LinkedIn debe ser un enlace válido.", "danger");
      return false;
    }
    if (form.github && !urlRegex.test(form.github)) {
      showToast("El GitHub debe ser un enlace válido.", "danger");
      return false;
    }
    return true;
  };

  // ----------------------------
  // Guardar / Actualizar creador
  // ----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const method = creatorId ? "PUT" : "POST";
    const url = creatorId ? `/api/creators/${creatorId}` : "/api/creators/portafolio";
    const data = await request(url, method, form);

    if (!data || data.error) {
      showToast(data?.error || "Error al guardar", "danger");
      return;
    }

    setCreator({ ...form, id: data.id || creatorId });
    setIsEditing(false);
    showToast("Datos guardados correctamente", "success");
    if (onSave) onSave({ ...form, id: data.id || creatorId });
  };

  // ----------------------------
  // Render
  // ----------------------------
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Datos del Creador</h2>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: "", type: toast.type })}
      />

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          {[
            { name: "name", placeholder: "Nombre" },
            { name: "title", placeholder: "Título profesional" },
            { name: "bio", placeholder: "Biografía", type: "textarea" },
            { name: "profile_image", placeholder: "URL de imagen de perfil" },
            { name: "phone", placeholder: "Teléfono" },
            { name: "linkedin", placeholder: "LinkedIn" },
            { name: "github", placeholder: "GitHub" },
          ].map((field) =>
            field.type === "textarea" ? (
              <textarea
                key={field.name}
                className="form-control mb-2"
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                required
              />
            ) : (
              <input
                key={field.name}
                type="text"
                className="form-control mb-2"
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                required={["name", "title", "phone"].includes(field.name)}
              />
            )
          )}
          <button className="btn btn-primary mt-2">{creatorId ? "Actualizar" : "Guardar"}</button>
        </form>
      ) : (
        <div className="card p-3">
          <p><b>Nombre:</b> {creator.name}</p>
          <p><b>Título:</b> {creator.title}</p>
          <p><b>Bio:</b> {creator.bio}</p>
          {creator.profile_image && (
            <img
              src={creator.profile_image}
              alt="Perfil"
              className="img-thumbnail mb-2"
              style={{ width: "120px" }}
            />
          )}
          <p><b>Teléfono:</b> {creator.phone}</p>
          <p><b>LinkedIn:</b> {creator.linkedin}</p>
          <p><b>GitHub:</b> {creator.github}</p>
          <button className="btn btn-secondary mt-2" onClick={() => setIsEditing(true)}>
            Editar
          </button>
        </div>
      )}
    </div>
  );
}
