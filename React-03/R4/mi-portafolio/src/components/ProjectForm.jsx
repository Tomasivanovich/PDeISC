import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "./Toast";

export default function ProjectForm({ creatorId, onSave }) {
  const api = useApi();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const showToast = (message, type = "success") => setToast({ show: true, message, type });

  // ------------------------
  // Leer proyectos
  // ------------------------
  useEffect(() => {
    if (!creatorId) return;

    const fetchProjects = async () => {
      try {
        const data = await api.get(`/api/projects/${creatorId}`);
        setProjects(data);
      } catch (err) {
        showToast(err.message || "Error al cargar proyectos", "danger");
      }
    };

    fetchProjects();
  }, [creatorId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // ------------------------
  // Validaciones
  // ------------------------
  const validateForm = () => {
    if (form.title.length < 2 || !isNaN(form.title)) {
      showToast("El título debe tener al menos 2 caracteres y no ser solo números", "danger");
      return false;
    }

    if (form.link) {
      try {
        new URL(form.link);
      } catch {
        showToast("El link debe ser una URL válida", "danger");
        return false;
      }
    }
    return true;
  };

  // ------------------------
  // Crear / Actualizar
  // ------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingIndex !== null) {
        const projId = projects[editingIndex].id;
        await api.put(`/api/projects/${projId}`, form);

        const updated = [...projects];
        updated[editingIndex] = { id: projId, ...form };
        setProjects(updated);
        setEditingIndex(null);
        showToast("Proyecto actualizado correctamente", "success");
      } else {
        const payload = { creator_id: creatorId, ...form };
        const data = await api.post(`/api/projects`, payload);
        setProjects([...projects, { id: data.id, ...form }]);
        showToast("Proyecto agregado correctamente", "success");
      }

      setForm({ title: "", description: "", image: "", link: "" });
      if (onSave) onSave({ creatorId, projects });
    } catch (err) {
      showToast(err.message || "Error al guardar proyecto", "danger");
    }
  };

  // ------------------------
  // Editar proyecto
  // ------------------------
  const handleEdit = (index) => {
    setForm(projects[index]);
    setEditingIndex(index);
  };

  // ------------------------
  // Eliminar proyecto
  // ------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este proyecto?")) return;
    try {
      await api.del(`/api/projects/${id}`);
      setProjects(projects.filter((p) => p.id !== id));
      showToast("Proyecto eliminado", "success");
    } catch (err) {
      showToast(err.message || "Error al eliminar proyecto", "danger");
    }
  };

  // ------------------------
  // Render
  // ------------------------
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Proyectos</h2>

      {/* Toast */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: "", type: toast.type })}
      />

      <form onSubmit={handleSubmit} className="animate__animated animate__fadeIn mb-4">
        {[
          { name: "title", placeholder: "Título" },
          { name: "description", placeholder: "Descripción" },
          { name: "image", placeholder: "URL Imagen" },
          { name: "link", placeholder: "Link" },
        ].map((field) => (
          <input
            key={field.name}
            type="text"
            className="form-control mb-2"
            name={field.name}
            placeholder={field.placeholder}
            value={form[field.name]}
            onChange={handleChange}
            required={field.name === "title"}
          />
        ))}
        <button type="submit" className="btn btn-primary">
          {editingIndex !== null ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <div className="list-group animate__animated animate__fadeIn">
        {projects.map((p, idx) => (
          <div key={p.id} className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start mb-2">
            <div>
              <p><b>Título:</b> {p.title}</p>
              <p><b>Descripción:</b> {p.description}</p>
              <p><b>Link:</b> {p.link}</p>
              <p><b>Imagen:</b> {p.image}</p>
            </div>
            <div className="mt-2 mt-md-0">
              <button className="btn btn-secondary btn-sm me-1" onClick={() => handleEdit(idx)}>Editar</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
