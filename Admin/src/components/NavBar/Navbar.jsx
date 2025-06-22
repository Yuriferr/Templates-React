import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./NavBar.css";
import axios from "axios";

import LogoPadrao from "../../images/logo.png";
import User from "../../images/user.png";

// Importando os ícones necessários
import { CiBoxList } from "react-icons/ci";
import { IoAnalytics, IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";

export default function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

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
  }, [navigate]); // Adicionando navigate ao array de dependências

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
          {/* Usando Link para navegação interna sem recarregar a página */}
          <Link to="/reviews">
            <CiBoxList className="icon" />
            <p>Avaliações</p>
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <IoAnalytics className="icon" />
            <p>Dashboard</p>
          </Link>
        </li>
        <hr />
        <li>
          {/* Link para a página de configurações com ícone apropriado */}
          <Link to="/">
            <IoSettingsOutline className="icon" />
            <p>Configurações</p>
          </Link>
        </li>
        {/* Item da lista que funciona como botão de logout */}
        <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <IoLogOutOutline className="icon" />
          <p>Sair</p>
        </li>
      </ul>
      {/* Mantendo as informações do usuário no final da barra de navegação */}
      {/* <div className="user-info">
        <img src={user.avatar || User} alt="Avatar" />
        <p>{user.email}</p>
      </div> */}
    </nav>
  );
}