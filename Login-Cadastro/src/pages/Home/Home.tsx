import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (!login) {
      navigate("/login");
    } else {
      setUser(JSON.parse(login));
    }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("login");
    navigate("/login");
  }

  return (
    <main className="home-container">
      <nav>
        <div className="logo" onClick={() => navigate("/")}>
          <img src="https://placehold.co/400" alt="Logo" />
          <h2>Empresa</h2>
        </div>
        <ul>
          <li>
            <a href="/#">Link</a>
          </li>
        </ul>
        <Popup
          trigger={
            <div className="user-info" style={{ cursor: "pointer" }}>
              <img src={"https://placehold.co/400"} alt="Avatar" />
              <p>{user.email}</p>
            </div>
          }
          position="top left"
          closeOnDocumentClick

        >
          <button onClick={handleLogout}>Sair</button>
        </Popup>
      </nav>
      <section style={{ padding: 32 }}>
        <h2>Bem-vindo à página inicial!</h2>
        <p>Esta é uma aplicação de exemplo.</p>
      </section>
    </main>
  );
}
