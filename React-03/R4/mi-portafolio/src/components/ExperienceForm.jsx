import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "./Toast"; // <-- Importar el componente Toast

export default function ExperienceForm({ creatorId, onSave }) {
  const { request } = useApi();

  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState({
    company: "",
    role: "",
    year_start: "",
    year_end: "",
    description: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const showToast = (message, type = "success") => setToast({ show: true, message, type });

  // ------------------------
  // Leer experiencias
  // ------------------------
  useEffect(() => {
    if (!creatorId) return;
    const fetchExperiences = async () => {
      const data = await request(`/api/experience/${creatorId}`, "GET");
      if (!data || data.error) {
        showToast(data?.error || "Error al cargar experiencias", "danger");
        return;
      }
      setExperiences(data);
    };
    fetchExperiences();
  }, [creatorId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // ------------------------
  // Validaciones
  // ------------------------
  const validateForm = () => {
    const currentYear = new Date().getFullYear();
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/.test(form.company)) {
      showToast("La empresa debe tener al menos 2 letras y no solo números.", "danger");
      return false;
    }
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/.test(form.role)) {
      showToast("El cargo debe tener al menos 3 letras y no solo números.", "danger");
      return false;
    }
    if (parseInt(form.year_start) > currentYear) {
      showToast("El año de inicio no puede ser en el futuro.", "danger");
      return false;
    }
    if (form.year_end && parseInt(form.year_end) < parseInt(form.year_start)) {
      showToast("El año de fin no puede ser anterior al inicio.", "danger");
      return false;
    }
    return true;
  };

  // ------------------------
  // Crear / Actualizar
  // ------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingIndex !== null) {
      const expId = experiences[editingIndex].id;
      const data = await request(`/api/experience/${expId}`, "PUT", form);
      if (!data || data.error) {
        showToast(data?.error || "Error al actualizar experiencia", "danger");
        return;
      }
      const updated = [...experiences];
      updated[editingIndex] = { id: expId, ...form };
      setExperiences(updated);
      setEditingIndex(null);
      showToast("Experiencia actualizada correctamente", "success");
    } else {
      const payload = { creator_id: creatorId, ...form };
      const data = await request("/api/experience", "POST", payload);
      if (!data || data.error) {
        showToast(data?.error || "Error al guardar experiencia", "danger");
        return;
      }
      setExperiences([...experiences, { id: data.id, ...form }]);
      showToast("Experiencia agregada correctamente", "success");
    }

    setForm({ company: "", role: "", year_start: "", year_end: "", description: "" });
    if (onSave) onSave({ creatorId, experiences });
  };

  // ------------------------
  // Editar experiencia
  // ------------------------
  const handleEdit = (index) => {
    setForm(experiences[index]);
    setEditingIndex(index);
  };

  // ------------------------
  // Eliminar experiencia
  // ------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta experiencia?")) return;
    const data = await request(`/api/experience/${id}`, "DELETE");
    if (!data || data.error) {
      showToast(data?.error || "Error al eliminar experiencia", "danger");
      return;
    }
    setExperiences(experiences.filter((exp) => exp.id !== id));
    showToast("Experiencia eliminada", "success");
  };

  // ------------------------
  // Render
  // ------------------------
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Experiencia Laboral</h2>

      {/* Toast */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: "", type: toast.type })}
      />

      <form onSubmit={handleSubmit} className="animate__animated animate__fadeIn mb-4">
        {[
          { name: "company", placeholder: "Empresa" },
          { name: "role", placeholder: "Cargo" },
          { name: "year_start", placeholder: "Año inicio", type: "number" },
          { name: "year_end", placeholder: "Año fin", type: "number" },
          { name: "description", placeholder: "Descripción", type: "textarea" },
        ].map((field) =>
          field.type === "textarea" ? (
            <textarea
              key={field.name}
              className="form-control mb-2"
              name={field.name}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={handleChange}
            />
          ) : (
            <input
              key={field.name}
              type={field.type || "text"}
              className="form-control mb-2"
              name={field.name}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={handleChange}
              required={["company", "role", "year_start"].includes(field.name)}
            />
          )
        )}
        <button type="submit" className="btn btn-primary">
          {editingIndex !== null ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <div className="list-group animate__animated animate__fadeIn">
        {experiences.map((exp, idx) => (
          <div key={exp.id} className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start mb-2">
            <div>
              <p><b>Empresa:</b> {exp.company}</p>
              <p><b>Cargo:</b> {exp.role}</p>
              <p><b>Año inicio:</b> {exp.year_start}</p>
              <p><b>Año fin:</b> {exp.year_end || "Presente"}</p>
              <p><b>Descripción:</b> {exp.description}</p>
            </div>
            <div className="mt-2 mt-md-0">
              <button className="btn btn-secondary btn-sm me-1" onClick={() => handleEdit(idx)}>Editar</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(exp.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
