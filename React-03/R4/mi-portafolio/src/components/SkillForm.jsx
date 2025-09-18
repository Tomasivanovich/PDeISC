import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "./Toast";

export default function SkillForm({ creatorId, onSave }) {
  const api = useApi();
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: "", level: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const showToast = (message, type = "success") => setToast({ show: true, message, type });

  // NUEVO: Estado para confirmar eliminación
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    if (!creatorId) return;

    const fetchSkills = async () => {
      setLoading(true);
      try {
        const data = await api.get(`/api/skills/${creatorId}`);
        setSkills(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        showToast("No se pudieron cargar las skills.", "danger");
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [creatorId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    if (!nameRegex.test(form.name)) {
      showToast("El nombre de la skill debe tener al menos 2 letras y no contener números.", "danger");
      return false;
    }
    const levelNum = Number(form.level);
    if (form.level && (levelNum < 1 || levelNum > 100)) {
      showToast("El nivel debe estar entre 1 y 100.", "danger");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingIndex !== null) {
        const skillId = skills[editingIndex].id;
        await api.put(`/api/skills/${skillId}`, form);
        const updated = [...skills];
        updated[editingIndex] = { id: skillId, creator_id: creatorId, ...form };
        setSkills(updated);
        setEditingIndex(null);
        showToast("Skill actualizada correctamente", "success");
      } else {
        const data = await api.post(`/api/skills`, { creator_id: creatorId, ...form });
        setSkills([...skills, { id: data.id, creator_id: creatorId, ...form }]);
        showToast("Skill agregada correctamente", "success");
      }
      setForm({ name: "", level: "" });
      if (onSave) onSave({ creatorId, skills });
    } catch (err) {
      console.error(err);
      showToast("No se pudo guardar la skill.", "danger");
    }
  };

  const handleEdit = (index) => {
    setForm(skills[index]);
    setEditingIndex(index);
  };

  // ------------------------
  // Eliminar skill
  // ------------------------
  const handleDelete = (id) => {
    setConfirmDelete(id); // activamos el mensaje de confirmación
  };

  const confirmDeletion = async (confirm) => {
    if (confirm && confirmDelete !== null) {
      try {
        await api.del(`/api/skills/${confirmDelete}`);
        setSkills(skills.filter((s) => s.id !== confirmDelete));
        showToast("Skill eliminada", "success");
      } catch (err) {
        console.error(err);
        showToast("No se pudo eliminar la skill.", "danger");
      }
    }
    setConfirmDelete(null); // cerramos confirmación
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3 animate__animated animate__fadeIn">Skills</h3>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: "", type: toast.type })}
      />

      {loading && <p>Cargando skills...</p>}

      <form onSubmit={handleSubmit} className="animate__animated animate__fadeIn mb-3">
        <input
          type="text"
          name="name"
          className="form-control mb-2"
          placeholder="Nombre de skill"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="level"
          className="form-control mb-2"
          placeholder="Nivel (1-100)"
          value={form.level}
          onChange={handleChange}
          min="1"
          max="100"
        />
        <button type="submit" className="btn btn-primary w-100">
          {editingIndex !== null ? "Actualizar" : "Agregar"} Skill
        </button>
      </form>

      {!loading && skills.length === 0 && <p>No hay skills aún.</p>}

      <ul className="list-group animate__animated animate__fadeIn">
        {skills.map((skill, idx) => (
          <li
            key={skill.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {skill.name} {skill.level ? `- Nivel: ${skill.level}` : ""}
            <div>
              <button className="btn btn-secondary btn-sm me-1" onClick={() => handleEdit(idx)}>
                Editar
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(skill.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* NUEVO: Confirmación de eliminación */}
      {confirmDelete && (
        <div className="alert alert-warning d-flex justify-content-between align-items-center mt-3">
          <span>¿Seguro que quieres eliminar esta skill?</span>
          <div>
            <button className="btn btn-sm btn-danger me-2" onClick={() => confirmDeletion(true)}>Sí</button>
            <button className="btn btn-sm btn-secondary" onClick={() => confirmDeletion(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}
