import { useNavigate } from "react-router-dom";
import  img from "../../assests/img-2.jpg"
import logo from "../../assests/logo.png"


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="card">
        <div className="card-image">
          <img src={img} alt="Treino" />
          <img src={logo} alt="Treino" />
        </div>

        

        <div className="card-body">
          <div className="button-group">
            <button className="btn" onClick={() => navigate("/aluno-login")}>
              Sou Aluno
            </button>
            <button
              className="btn secondary"
              onClick={() => navigate("/admin-login")}
            >
              Sou Administrador
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
