import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "./components/Axios";
import "./Home.css";
import Medicines from "./components/Medicines";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/", { replace: true });
  };

  useEffect(() => {
    AxiosInstance.get("me/")
      .then(({ data }) => setUser(data))
      .catch(() => handleLogout()); // token inválido o vencido
  }, []);

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Dosis</h1>
        <button className="btn-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <main className="home-content">
        <h2>Bienvenido</h2>
        <p>Has iniciado sesión como {user?.email}</p>
        <Medicines />
      </main>
    </div>
  );
}
