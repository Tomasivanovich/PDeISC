import { useState, useEffect } from "react";

export default function SkillForm({ creatorId, onSave }) {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: "", level: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!creatorId) return;
    const fetchSkills = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:4000/api/skills/${creatorId}`);
        // manejar respuestas no-ok
        if (!res.ok) {
          const text = await res.text(); // puede venir HTML
          throw new Error(`Error ${res.status}: ${text}`);
        }
        const data = await res.json();
        setSkills(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Error al cargar skills:", err);
        setError("No se pudieron cargar las skills. Revisá la API.");
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [creatorId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("http://localhost:4000/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creator_id: creatorId, ...form }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error ${res.status}: ${text}`);
      }

      const data = await res.json();
      setSkills([...skills, { id: data.id, creator_id: creatorId, ...form }]);
      setForm({ name: "", level: "" });
      if (onSave) onSave({ creatorId, skills });
    } catch (err) {
      console.error("❌ Error al crear skill:", err);
      setError("No se pudo guardar la skill. Revisá la consola.");
    }
  };

  return (
    <div className="skill-form">
      <h3>Skills</h3>

      {loading && <p>Cargando skills...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre de skill"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="level"
          placeholder="Nivel (1-100)"
          value={form.level}
          onChange={handleChange}
          min="1"
          max="100"
        />
        <button type="submit">Agregar Skill</button>
      </form>

      {!loading && skills.length === 0 && <p>No hay skills aún.</p>}

      <ul>
        {skills.map((skill) => (
          <li key={skill.id}>
            {skill.name} {skill.level ? `- Nivel: ${skill.level}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
