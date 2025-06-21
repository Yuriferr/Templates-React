import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./NavBar.css"; // Assuming you have a NavBar.css file
import axios from "axios";

import LogoPadrao from "../../images/logo.png";
import User from "../../images/user.png"; // Importando imagem de usuário padrão

import { CiBoxList } from "react-icons/ci";
import { IoAnalytics } from "react-icons/io5";

export default function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({}); // Simplificado para objeto vazio

  const [empresa, setEmpresa] = useState({
    nomeEmpresa: "Salão Águas Claras",
    caminhoLogo: LogoPadrao,
  });

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login) {
      setUser(JSON.parse(login));
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    axios
      .get(`${API_URL}/empresa`)
      .then((res) => {
        setEmpresa({
          nomeEmpresa: res.data.nomeEmpresa || "Salão Águas Claras",
          caminhoLogo: res.data.caminhoLogo || LogoPadrao,
        });
      })
      .catch(() => {
        setEmpresa({
          nomeEmpresa: "Salão Águas Claras",
          caminhoLogo: LogoPadrao,
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
          <a href="/reviews">
            <CiBoxList className="icon" />
            <p>Avaliações</p>
          </a>
        </li>
        <li>
          <a href="/dashboard">
            <IoAnalytics className="icon" />
            <p>Dashboard</p>
          </a>
        </li>
      </ul>
      <Popup
        trigger={
          <div className="user-info">
            {/* You might want to use user.avatar here if available */}
            <img src={user.avatar || User} alt="Avatar" />
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
