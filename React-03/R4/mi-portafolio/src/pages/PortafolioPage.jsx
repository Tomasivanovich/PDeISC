import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreatorForm from "../components/CreatorForm";
import ExperienceForm from "../components/ExperienceForm";
import ProjectForm from "../components/ProjectForm";
import SkillForm from "../components/SkillForm"; // 🔹 Importar SkillForm

export default function PortfolioPage() {
  const { id } = useParams(); // creatorId desde la URL
  const [creatorId, setCreatorId] = useState(id || null);

  const handleSaveCreator = (data) => {
    console.log("✅ Datos guardados del creador:", data);
  };

  const handleSaveExperience = (data) => {
    console.log("✅ Experiencias guardadas:", data);
  };

  const handleSaveProject = (data) => {
    console.log("✅ Proyectos guardados:", data);
  };

  const handleSaveSkill = (data) => {
    console.log("✅ Skills guardadas:", data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Editor de Portafolio</h1>

      {/* Formulario principal del creador */}
      <CreatorForm creatorId={creatorId} onSave={handleSaveCreator} />

      <hr style={{ margin: "20px 0" }} />

      {/* Formulario de experiencias */}
      {creatorId && (
        <ExperienceForm creatorId={creatorId} onSave={handleSaveExperience} />
      )}

      <hr style={{ margin: "20px 0" }} />

      {/* Formulario de proyectos */}
      {creatorId && (
        <ProjectForm creatorId={creatorId} onSave={handleSaveProject} />
      )}

      <hr style={{ margin: "20px 0" }} />

      {/* Formulario de skills */}
      {creatorId && <SkillForm creatorId={creatorId} onSave={handleSaveSkill} />}
    </div>
  );
}
