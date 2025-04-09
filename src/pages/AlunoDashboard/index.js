import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";

export default function AlunoDashboard() {
  const [treinos, setTreinos] = useState([]);
  const [treinoSelecionado, setTreinoSelecionado] = useState("");
  const [concluidos, setConcluidos] = useState({}); 
  const [nome, setNome] = useState("");
const [treinoConcluido, setTreinoConcluido] = useState(false);






useEffect(() => {
  const savedUser = JSON.parse(localStorage.getItem("loggedUser"));

  if (savedUser) {
    setNome(savedUser.name || savedUser.email);

    const buscarTreinos = async () => {
      const q = query(
        collection(db, "workouts"),
        where("uid", "==", savedUser.uid)
      );
      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map((doc) => doc.data());
      setTreinos(lista);
    };

    buscarTreinos();
  }
}, []);



  const tiposDeTreino = [...new Set(treinos.map((t) => t.title))];

  const treinoFiltrado = treinos.find((t) => t.title === treinoSelecionado);

  const toggleCheckbox = (index) => {
    setConcluidos((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

 const concluirTreino = () => {
   const total = treinoFiltrado.exercises.length;
   const feitos = Object.values(concluidos).filter((v) => v).length;

   if (feitos < total) {
     toast.warn("Você ainda não concluiu todos os exercícios!");
     return;
   }





   // Resetar os checkboxes
   setConcluidos({});
   setTreinoSelecionado("");
      setTreinoConcluido(true);
      setTimeout(() => setTreinoConcluido(false), 5000);
 };

 const navigate = useNavigate();

 const handleLogout = () => {
   navigate("/");
 };

  return (
    <div className="page-container">
      <h2>Bem-vindo, {nome}!</h2>
      <label>Escolha o treino do dia: </label>
      <select
        value={treinoSelecionado}
        onChange={(e) => {
          setTreinoSelecionado(e.target.value);
          setConcluidos({});
        }}
      >
        <option value="">Selecione</option>
        {tiposDeTreino.map((tipo, index) => (
          <option key={index} value={tipo}>
            {tipo}
          </option>
        ))}
      </select>

      {/* Mensagem fora da condicional do treinoFiltrado */}
      {treinoConcluido && (
        <p className="success-message">✅ Treino concluído! Parabéns! 💪✨</p>
      )}

      {treinoFiltrado && (
        <div className="exercise-block">
          <h3>{treinoFiltrado.title}</h3>
          {treinoFiltrado.exercises.map((ex, i) => (
            <div key={i} style={{ marginBottom: "15px"}}>
              <label>
                <input
                  type="checkbox"
                  checked={concluidos[i] || false}
                  onChange={() => toggleCheckbox(i)}
                />
                {` ${ex.nome} – ${ex.series} séries de ${ex.repeticoes}`}
              </label>
            </div>
          ))}

          <button onClick={concluirTreino}>Concluir treino do dia</button>
        </div>
      )}

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
  );
}
