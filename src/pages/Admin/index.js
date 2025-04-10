// src/pages/Admin.jsx
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";

export default function AdminPage() {
  // Usuário

  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [alunoEmailParaTreino, setAlunoEmailParaTreino] = useState("");


  // Treino
  const [title, setTitle] = useState("");
  const [exercises, setExercises] = useState([{ nome: "", series: "" }]);
const navigate = useNavigate();

  const handleLogout = () => {
   
    navigate("/"); 
  };
  const handleAddExercise = () => {
    setExercises([...exercises, { nome: "", series: "" }]);
  };

  const handleChangeExercise = (index, field, value) => {
      const updatedExercises = [...exercises];
      updatedExercises[index][field] = value;
      setExercises(updatedExercises);
  };

  // Criar usuário no Auth
const handleCreateUser = async () => {
  try {
    if (!userName || !userPassword || !alunoEmailParaTreino) {
      toast.warn("Preencha nome, e-mail e senha!");
      return;
    }

    // Cria o usuário no Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      alunoEmailParaTreino,
      userPassword
    );

    const user = userCredential.user;

    // Salva dados extras no Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: userName,
      email: alunoEmailParaTreino,
      createdAt: new Date(),
    });

    toast.success("✅ Usuário criado com sucesso!");
    setUserName("");

    setUserPassword("");
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    toast.error("❌ Erro ao criar usuário.");
  }
};

  // Criar treino no Firestore
 const handleCreateWorkout = async () => {
   try {
     const q = query(
       collection(db, "users"),
       where("email", "==", alunoEmailParaTreino)
     );

     const snapshot = await getDocs(q);

     if (snapshot.empty) {
       toast.error("Usuário não encontrado.");
       return;
     }

     const userDoc = snapshot.docs[0];
     const userData = userDoc.data();

     await addDoc(collection(db, "workouts"), {
       title,
       uid: userData.uid,
       exercises,
       createdAt: new Date(),
     });

     toast.success("🏋️‍♀️ Treino criado com sucesso!");
     setTitle("");
     setExercises([{ nome: "", series: "", repeticoes: "" }]);
   } catch (error) {
     console.error("Erro ao criar treino:", error);
     toast.error("❌ Erro ao criar treino. Veja o console.");
   }
 };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>👩‍🏫 Painel da Admin</h2>

      <h3>🧍 Criar novo usuário</h3>
      <input
        placeholder="Nome do aluno"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        placeholder="E-mail do aluno"
        value={alunoEmailParaTreino}
        onChange={(e) => setAlunoEmailParaTreino(e.target.value)}
      />

      <input
        placeholder="Senha"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
        type="password"
      />
      <button onClick={handleCreateUser}>Criar Usuário</button>

      <hr style={{ margin: "20px 0" }} />

      <h3>🏋️ Criar treino</h3>
      <input
        placeholder="Título do treino"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {exercises.map((ex, i) => (
        <div key={i} style={{ marginBottom: "15px" }}>
          <input
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            placeholder="Nome do exercício"
            value={ex.nome}
            onChange={(e) => handleChangeExercise(i, "nome", e.target.value)}
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              style={{ flex: 1 }}
              placeholder="Séries"
              value={ex.series}
              onChange={(e) =>
                handleChangeExercise(i, "series", e.target.value)
              }
            />
            <input
              style={{ flex: 1 }}
              placeholder="Repetições"
              value={ex.repeticoes}
              onChange={(e) =>
                handleChangeExercise(i, "repeticoes", e.target.value)
              }
            />
          </div>
        </div>
      ))}

      <button onClick={handleAddExercise}>+ Adicionar Exercício</button>
      <button onClick={handleCreateWorkout}>Criar Treino</button>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#e63946",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Sair
        </button>
      </div>
    </div>
  );
}
