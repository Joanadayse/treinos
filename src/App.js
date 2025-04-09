import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AlunoDashboard from "./pages/AlunoDashboard"
import AdminLogin from "./pages/AdminLogin";
import LoginAluno from "./pages/LoginAluno";
import Admin from "./pages/Admin";
import Home from "./pages/Home"
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/aluno-login" element={<LoginAluno />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/aluno"
          element={<AlunoDashboard  />}
        />
      </Routes>
    </Router>
  );
}

export default App;
