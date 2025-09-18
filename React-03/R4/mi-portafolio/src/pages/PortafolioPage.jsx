import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreatorForm from "../components/CreatorForm";
import ExperienceForm from "../components/ExperienceForm";
import ProjectForm from "../components/ProjectForm";
import SkillForm from "../components/SkillForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";

export default function PortafolioPage() {
  const { id } = useParams(); // creatorId desde la URL
  const [creatorId, setCreatorId] = useState(id || null);

  const handleSaveCreator = (data) => console.log("✅ Datos guardados del creador:", data);
  const handleSaveExperience = (data) => console.log("✅ Experiencias guardadas:", data);
  const handleSaveProject = (data) => console.log("✅ Proyectos guardados:", data);
  const handleSaveSkill = (data) => console.log("✅ Skills guardadas:", data);

  return (
    <div
      className="container py-5"
      style={{
        background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
        minHeight: "100vh",
      }}
    >
      <h1 className="mb-5 text-center animate__animated animate__fadeInDown fw-bold text-primary">
        Editor de Portafolio
      </h1>

      {/* Formulario principal del creador */}
      <section className="mb-5 animate__animated animate__fadeIn">
        <div className="card shadow-lg rounded-4 p-4">
          <h3 className="mb-3 fw-bold text-secondary">Información del Creador</h3>
          <CreatorForm creatorId={creatorId} onSave={handleSaveCreator} />
        </div>
      </section>

      {creatorId && (
        <>
          <hr className="my-5 border-2 border-primary opacity-25" />

          {/* Formulario de experiencias */}
          <section className="mb-5 animate__animated animate__fadeIn">
            <div className="card shadow-lg rounded-4 p-4">
              <h3 className="mb-3 fw-bold text-secondary">Experiencias</h3>
              <ExperienceForm creatorId={creatorId} onSave={handleSaveExperience} />
            </div>
          </section>

          <hr className="my-5 border-2 border-primary opacity-25" />

          {/* Formulario de proyectos */}
          <section className="mb-5 animate__animated animate__fadeIn">
            <div className="card shadow-lg rounded-4 p-4">
              <h3 className="mb-3 fw-bold text-secondary">Proyectos</h3>
              <ProjectForm creatorId={creatorId} onSave={handleSaveProject} />
            </div>
          </section>

          <hr className="my-5 border-2 border-primary opacity-25" />

          {/* Formulario de skills */}
          <section className="mb-5 animate__animated animate__fadeIn">
            <div className="card shadow-lg rounded-4 p-4">
              <h3 className="mb-3 fw-bold text-secondary">Skills</h3>
              <SkillForm creatorId={creatorId} onSave={handleSaveSkill} />
            </div>
          </section>
        </>
      )}
    </div>
  );
}
