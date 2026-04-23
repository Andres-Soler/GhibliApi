import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useEffect, useState } from "react";

import Informativa from './informativa'
import Original from './original'
import Usuario from './usuario'
import Home from './home'
import Favoritos from './favoritos'
import Detalles from './detalles'

import './App.css'

function App() {

  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch("https://ghibliapi.vercel.app/films/")
      .then(res => res.json())
      .then(data => setFilms(data));
  }, []);

  return (
    <>
      <Router>

        <nav className="c-menu">

          <Link to="/">
            <p>Home</p>
          </Link>

          <Link to="/favoritos">
            <p>Favoritos</p>
          </Link>

          <Link to="/original">
            <p>Original</p>
          </Link>

          <Link to="/informativa">
            <p>Informativa</p>
          </Link>

          <Link to="/usuario">
            <p>Usuario</p>
          </Link>

        </nav>

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/favoritos" element={<Favoritos />} />

          <Route path="/original" element={<Original />} />

          <Route path="/informativa" element={<Informativa />} />

          <Route path="/usuario" element={<Usuario />} />

          <Route path="/pelicula/:id" element={<Detalles detalles={films} />} />

        </Routes>

      </Router>
    </>
  )
}

export default App