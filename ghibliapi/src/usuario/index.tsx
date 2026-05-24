import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "./style.css";

export default function Usuario() {
  const { user, logout } = useAuth();

  useEffect(() => {
    console.log("Usuario actual:", user);
  }, [user]);

  if (!user) {
    return <h2>No hay sesión activa</h2>;
  }

  return (
    <div className="user-container">
      <div className="user-card">

        <h1>Panel de usuario</h1>

        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>UID:</strong> {user.uid}</p>

        <button onClick={logout}>
          Cerrar sesión
        </button>

      </div>
    </div>
  );
}