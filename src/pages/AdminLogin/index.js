import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const cred = await signInWithEmailAndPassword(auth, email, senha);

      // Exemplo simples: verifica se é um admin específico
      if (cred.user.email === "larissaadm@email.com") {
        navigate("/admin");
      } else {
        alert("Este usuário não é administrador.");
      }
    } catch (err) {
      alert("Erro ao fazer login: " + err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login do Administrador</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email do administrador"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default AdminLogin;
