import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Film {
  id: string
  title: string
  image: string
  director: string
  release_date: string
}

function Favoritos() {

  const [favorites, setFavorites] = useState<string[]>([])
  const [films, setFilms] = useState<Film[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]")
    setFavorites(stored)
  }, [])

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await fetch("https://ghibliapi.vercel.app/films/")
        const data = await res.json()
        setFilms(data)
      } catch (error) {
        console.error("Error cargando películas:", error)
      }
    }

    fetchFilms()
  }, [])

  const peliculasFavoritas = films.filter(film => favorites.includes(film.id))

  return (
    <div>
      <h1>Películas favoritas</h1>

      {peliculasFavoritas.length === 0 ? (
        <p>No tienes películas favoritas</p>
      ) : (
        <ul>
          {peliculasFavoritas.map((film) => (
            <li key={film.id}>
              <Link to={`/equipo/${film.id}`}>
                <img src={film.image} width="80"/>
                <p>{film.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Favoritos;