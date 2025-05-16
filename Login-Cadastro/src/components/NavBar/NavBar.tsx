import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import "./NavBar.css";

export default function NavBar() {
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
    <nav>
      <div className="logo" onClick={() => navigate("/")}>
        <img src="https://placehold.co/400" alt="Logo" />
        <h2>Empresa</h2>
      </div>
      <ul>
        <li>
          <a href="/list">Lista</a>
        </li>
      </ul>
      <Popup
        trigger={
          <div className="user-info">
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
  );
}
