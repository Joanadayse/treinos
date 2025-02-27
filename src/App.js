import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Home";


function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<h1>Dashboard (em desenvolvimento)</h1>}/>
      </Routes>
    </Router>
   
  );
}

export default App;
