import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import logo from "../../assests/image.png"

const Login = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const whatsappNumber = "559884600588"; // Substitua pelo número correto
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard"); // Redireciona para a tela principal após login
    } catch (error) {
      alert("Erro ao fazer login com Google: " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <img
        src={logo}
        alt="Logo"
        style={{ width: "200px" }}
      />
      <h2>Treinos Personalizados</h2>
      <button
        onClick={handleGoogleLogin}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#004AAD", // Cor azul da logo
          color: "white",
          fontWeight: "bold",
          borderRadius: "8px",
          border: "none",
        }}
      >
        Entrar com Google
      </button>
      <p style={{ marginTop: "20px" }}>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#25D366", fontWeight: "bold" }}
        >
          Fale conosco no WhatsApp
        </a>
      </p>
      ;
    </div>
  );
};

export default Login;
