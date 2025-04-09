import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { toast } from "react-toastify";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function LoginAluno() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email || !senha) {
        toast.warn("Preencha todos os campos!");
        return;
      }

    

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const user = userCredential.user;

      // Busca dados adicionais no Firestore
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        toast.error("Usuário não encontrado.");
        return;
      }

      const userData = snapshot.docs[0].data();

      localStorage.setItem(
        "loggedUser",
        JSON.stringify({
          uid: user.uid,
          name: userData.name,
          email: user.email,
        })
      );

      toast.success("✅ Login realizado!");
      navigate("/aluno");
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("Erro ao fazer login.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login do Aluno</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
