import { useState, useEffect } from "react";

export default function ExperienceForm({ creatorId, onSave }) {
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState({
    company: "",
    role: "",
    year_start: "",
    year_end: "",
    description: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (!creatorId) return;
    const fetchExperiences = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/experience/${creatorId}`);
        const data = await res.json();
        if (res.ok || !data.error) setExperiences(data);
        else alert(data.error || "Error al cargar experiencias");
      } catch (err) {
        console.error("❌ Error al cargar experiencias:", err);
      }
    };
    fetchExperiences();
  }, [creatorId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingIndex !== null) {
        // 🔹 Actualizar experiencia existente
        const expId = experiences[editingIndex].id;
        const res = await fetch(`http://localhost:4000/api/experience/${expId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) {
          alert(data.error || "Error al actualizar experiencia");
          return;
        }

        const updated = [...experiences];
        updated[editingIndex] = { id: expId, ...form };
        setExperiences(updated);
        setEditingIndex(null);
      } else {
        // 🔹 Crear nueva experiencia
        const payload = { creator_id: creatorId, ...form };
        const res = await fetch("http://localhost:4000/api/experience", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          alert(data.error || "Error al guardar experiencia");
          return;
        }
        setExperiences([...experiences, { id: data.id, ...form }]);
      }

      setForm({ company: "", role: "", year_start: "", year_end: "", description: "" });
      if (onSave) onSave({ creatorId, experiences });
    } catch (err) {
      console.error("❌ Error al guardar experiencia:", err);
    }
  };

  const handleEdit = (index) => {
    setForm(experiences[index]);
    setEditingIndex(index);
  };

  return (
    <div className="experience-form-box">
      <h2>Experiencia Laboral</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="company" placeholder="Empresa" value={form.company} onChange={handleChange} required />
        <input type="text" name="role" placeholder="Cargo" value={form.role} onChange={handleChange} required />
        <input type="number" name="year_start" placeholder="Año inicio" value={form.year_start} onChange={handleChange} required />
        <input type="number" name="year_end" placeholder="Año fin" value={form.year_end || ""} onChange={handleChange} />
        <textarea name="description" placeholder="Descripción" value={form.description || ""} onChange={handleChange}></textarea>
        <button type="submit">{editingIndex !== null ? "Actualizar" : "Agregar"}</button>
      </form>

      <div className="experience-list">
        {experiences.map((exp, idx) => (
          <div key={exp.id} className="experience-item">
            <p><b>Empresa:</b> {exp.company}</p>
            <p><b>Cargo:</b> {exp.role}</p>
            <p><b>Año inicio:</b> {exp.year_start}</p>
            <p><b>Año fin:</b> {exp.year_end || "Presente"}</p>
            <p><b>Descripción:</b> {exp.description}</p>
            <button onClick={() => handleEdit(idx)}>Editar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
