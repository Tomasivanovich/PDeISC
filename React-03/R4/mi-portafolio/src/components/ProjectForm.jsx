import { useEffect, useState } from "react";

export default function ProjectForm({ creatorId, onSave }) {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (!creatorId) return;
    const fetchProjects = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/projects/${creatorId}`);
        const data = await res.json();
        if (res.ok) setProjects(data);
        else alert(data.error || "Error al cargar proyectos");
      } catch (err) {
        console.error("❌ Error al cargar proyectos:", err);
      }
    };
    fetchProjects();
  }, [creatorId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { creator_id: creatorId, ...form };
      const res = await fetch("http://localhost:4000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Error al guardar proyecto");
        return;
      }

      if (editingIndex !== null) {
        const updated = [...projects];
        updated[editingIndex] = { id: updated[editingIndex].id, ...form };
        setProjects(updated);
      } else {
        setProjects([...projects, { id: data.id, ...form }]);
      }

      setForm({ title: "", description: "", image: "", link: "" });
      setEditingIndex(null);

      if (onSave) onSave({ creatorId, projects });
    } catch (err) {
      console.error("❌ Error al guardar proyecto:", err);
    }
  };

  const handleEdit = (index) => {
    setForm(projects[index]);
    setEditingIndex(index);
  };

  return (
    <div className="project-form-box">
      <h2>Proyectos</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Título" value={form.title} onChange={handleChange} required />
        <input name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
        <input name="image" placeholder="URL Imagen" value={form.image} onChange={handleChange} />
        <input name="link" placeholder="Link" value={form.link} onChange={handleChange} />
        <button type="submit">{editingIndex !== null ? "Actualizar" : "Agregar"}</button>
      </form>

      <div className="project-list">
        {projects.map((p, idx) => (
          <div key={p.id} className="project-item">
            <p><b>Título:</b> {p.title}</p>
            <p><b>Descripción:</b> {p.description}</p>
            <p><b>Link:</b> {p.link}</p>
            <p><b>Imagen:</b> {p.image}</p>
            <button onClick={() => handleEdit(idx)}>Editar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
