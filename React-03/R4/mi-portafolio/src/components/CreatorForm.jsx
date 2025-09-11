import { useState, useEffect } from "react";

export default function CreatorForm({ creatorId, onSave }) {
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

  const token = localStorage.getItem("token");

  // 🔹 Cargar creador existente
  useEffect(() => {
    if (!creatorId) return;

    const fetchCreator = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/creators/${creatorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok || !data.error) {
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
        } else {
          alert(data.error || "Error al cargar creador");
        }
      } catch (err) {
        console.error("❌ Error al cargar creador:", err);
      }
    };

    fetchCreator();
  }, [creatorId, token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = creatorId ? "PUT" : "POST";
      const url = creatorId
        ? `http://localhost:4000/api/creators/${creatorId}`
        : "http://localhost:4000/api/creators/portafolio";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al guardar");
        return;
      }

      setCreator({ ...form, id: data.id || creatorId });
      setIsEditing(false);
      if (onSave) onSave({ ...form, id: data.id || creatorId });
    } catch (err) {
      console.error("❌ Error al guardar creador:", err);
    }
  };

  return (
    <div className="form-box">
      <h2>Datos del Creador</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
          <input type="text" name="title" placeholder="Título profesional" value={form.title} onChange={handleChange} required />
          <textarea name="bio" placeholder="Biografía" value={form.bio} onChange={handleChange} required />
          <input type="text" name="profile_image" placeholder="URL de imagen de perfil" value={form.profile_image} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} required />
          <input type="text" name="linkedin" placeholder="LinkedIn" value={form.linkedin} onChange={handleChange} required />
          <input type="text" name="github" placeholder="GitHub" value={form.github} onChange={handleChange} required />
          <button type="submit">{creatorId ? "Actualizar" : "Guardar"}</button>
        </form>
      ) : (
        <div className="creator-data">
          <p><b>Nombre:</b> {creator.name}</p>
          <p><b>Título:</b> {creator.title}</p>
          <p><b>Bio:</b> {creator.bio}</p>
          {creator.profile_image && <img src={creator.profile_image} alt="Perfil" style={{ width: "120px", borderRadius: "10px" }} />}
          <p><b>Teléfono:</b> {creator.phone}</p>
          <p><b>LinkedIn:</b> {creator.linkedin}</p>
          <p><b>GitHub:</b> {creator.github}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </div>
      )}
    </div>
  );
}
