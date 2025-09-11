import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginSelector from "./pages/LoginSelector";
import RegisterForm from "./components/RegisterForm";
import PortfolioPage from "./pages/PortafolioPage";
import CreatorLogin from "./pages/CreatorLogin";
import VisitorLogin from "./pages/VisitorLogin";

function App() {
  return (
    <Router>
      <Routes>
        {/* Selector de login */}
        <Route path="/login" element={<LoginSelector />} />

        {/* Registro */}
        <Route path="/register" element={<RegisterForm />} />

        {/* Login específico */}
        <Route path="/login/creator" element={<CreatorLogin />} />
        <Route path="/login/visitor" element={<VisitorLogin />} />

        {/* Portafolio del creador */}
        <Route path="/portfolio/:id" element={<PortfolioPage />} />

        {/* Redirigir rutas desconocidas */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
