import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import "./home.css"


const Login = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const whatsappNumber = "559884600588"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}`;


  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard"); 
    } catch (error) {
      alert("Erro ao fazer login com Google: " + error.message);
    }
  };

  return (
    <div className="div-container">
      <div className="mask"></div>

      <h1>Larissa Renata</h1>
      <h2>Treinos Personalizados</h2>

      <button
        onClick={handleGoogleLogin}
      >
        Entrar com Google
      </button>

      <p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#25D366", fontWeight: "bold" }}
        >
          Fale conosco no WhatsApp
        </a>
      </p>
    </div>
  );
};

export default Login;
