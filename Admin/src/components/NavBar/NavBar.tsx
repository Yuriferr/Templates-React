import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./NavBar.css";
import axios from "axios";

export default function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [empresa, setEmpresa] = useState<{ nomeEmpresa: string; caminhoLogo: string }>({
    nomeEmpresa: "Empresa",
    caminhoLogo: "https://placehold.co/400",
  });

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login) {
      setUser(JSON.parse(login));
    }
  }, []);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    axios
      .get(`${API_URL}/empresa`) // Ajuste a rota conforme necessário
      .then((res) => {
        // Ajuste conforme o retorno real da API
        setEmpresa({
          nomeEmpresa: res.data.nomeEmpresa || "Empresa",
          caminhoLogo: res.data.caminhoLogo || "https://placehold.co/400",
        });
      })
      .catch(() => {
        setEmpresa({
          nomeEmpresa: "Empresa",
          caminhoLogo: "https://placehold.co/400",
        });
      });
  }, []);

  function handleLogout() {
    localStorage.removeItem("login");
    navigate("/login");
  }

  return (
    <nav className="NavBar">
      <div className="logo" onClick={() => navigate("/")}>
        <img src={empresa.caminhoLogo} alt="Logo" />
        <h2>{empresa.nomeEmpresa}</h2>
      </div>
      <ul>
        <li>
          <a href="/list">Lista</a>
        </li>
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
      </ul>
      <Popup
        trigger={
          <div className="user-info">
            <img src={"https://placehold.co/400"} alt="Avatar" />
            <p>{user.email}</p>
          </div>
        }
        position="top center"
        closeOnDocumentClick
      >
        <button className="closeButton" onClick={handleLogout}>
          Sair
        </button>
      </Popup>
    </nav>
  );
}