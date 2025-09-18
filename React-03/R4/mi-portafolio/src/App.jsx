import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginSelector from "./pages/LoginSelector";
import RegisterCreatorForm from "./components/RegisterCreatorForm";
import PortafolioPage from "./pages/PortafolioPage";
import CreatorLogin from "./pages/CreatorLogin";
import VisitorLogin from "./pages/VisitorLogin";
import VisitorRegister from "./components/VisitorRegister";
import VisitorSearchPortfolio from "./pages/VisitorSearchPortfolio";

function App() {
  return (
    <Router>
      <Routes>
        {/* Selector de login */}
        <Route path="/login" element={<LoginSelector />} />

        {/* Registro */}
        <Route path="/register" element={<RegisterCreatorForm />} />
        <Route path="/register/visitor" element={<VisitorRegister />} />

        {/* Login específico */}
        <Route path="/login/creator" element={<CreatorLogin />} />
        <Route path="/login/visitor" element={<VisitorLogin />} />

        {/* Portafolio del creador */}
        <Route path="/portfolio/:id" element={<PortafolioPage />} />

        {/* Búsqueda de portafolio para visitantes */}
        <Route path="/visitor/search" element={<VisitorSearchPortfolio />} />

        {/* Redirigir rutas desconocidas */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
