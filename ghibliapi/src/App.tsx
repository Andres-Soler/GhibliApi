import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";

import Informativa from './informativa'
import Original from './original'
import Usuario from './usuario'
import Home from './home'
import Favoritos from './favoritos'
import Detalles from './detalles'

import Login from './login'
import Register from './registro'

import { useAuth } from './context/AuthContext'

import './App.css'

function App() {

  const { user, logout } = useAuth();

  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch("https://ghibliapi.vercel.app/films/")
      .then(res => res.json())
      .then(data => setFilms(data));
  }, []);

  return (
    <Router>

      <div id="center">
        <nav className="navbar">

          <Link to="/">Home</Link>
          <Link to="/favoritos">Favoritos</Link>
          <Link to="/original">Original</Link>
          <Link to="/informativa">Informativa</Link>

          {user && <Link to="/usuario">Usuario</Link>}

          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/registro">Registro</Link>
            </>
          ) : (
            <>
              <span className="user-status online">Conectado</span>
              
              <span className="nav-item logout" onClick={logout}>
                Logout
              </span>
            </>
          )}

        </nav>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/original" element={<Original />} />
          <Route path="/informativa" element={<Informativa />} />
          <Route path="/pelicula/:id" element={<Detalles detalles={films} />} />

          <Route
            path="/login"
            element={user ? <Navigate to="/usuario" /> : <Login />}
          />

          <Route
            path="/registro"
            element={user ? <Navigate to="/usuario" /> : <Register />}
          />

          <Route
            path="/usuario"
            element={user ? <Usuario /> : <Navigate to="/login" />}
          />

        </Routes>

      </div>

    </Router>
  )
}

export default App