import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./style.css"

interface Film {
  id: string
  title: string
  description: string
  director: string
  release_date: string
  image: string
}

function Home() {

  const [films, setFilms] = useState<Film[]>([])
  const [busqueda, setBusqueda] = useState("")
  const [filtro, setFiltro] = useState("todos")
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {

    const stored = JSON.parse(localStorage.getItem("favorites") || "[]")
    setFavorites(stored)

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

  const toggleFavorite = (id: string) => {

    let updated = [...favorites]

    if (updated.includes(id)) {
      updated = updated.filter((fav) => fav !== id)
    } else {
      updated.push(id)
    }

    setFavorites(updated)
    localStorage.setItem("favorites", JSON.stringify(updated))
  }

  const filmsFiltrados = films.filter((film) => {

    const coincideBusqueda =
      busqueda.length < 2 ||
      film.title.toLowerCase().includes(busqueda.toLowerCase())

    const coincideDirector =
      filtro === "todos" ||
      film.director.toLowerCase().includes(filtro)

    return coincideBusqueda && coincideDirector
  })

  return (
    <>

      <input
        type="text"
        placeholder="Buscar película..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="filtros">

        <button
          onClick={() => setFiltro("todos")}
          className={filtro === "todos" ? "activo" : ""}
        >
          Todas
        </button>

        <button
          onClick={() => setFiltro("miyazaki")}
          className={filtro === "miyazaki" ? "activo" : ""}
        >
          Miyazaki
        </button>

        <button
          onClick={() => setFiltro("takahata")}
          className={filtro === "takahata" ? "activo" : ""}
        >
          Takahata
        </button>

      </div>

      <div className="tabla-container">
        <h2>Películas</h2>

        <table className="tabla-posiciones">

          <thead>
            <tr>
              <th>Poster</th>
              <th>Título</th>
              <th>Director</th>
              <th>Año</th>
              <th>Fav</th>
            </tr>
          </thead>

          <tbody>

            {filmsFiltrados.map((film) => (
              <tr key={film.id}>

                <td>
                  <img src={film.image} width="60" />
                </td>

                <td>
                  <Link to={`/pelicula/${film.id}`}>
                    {film.title}
                  </Link>
                </td>

                <td>{film.director}</td>
                <td>{film.release_date}</td>

                <td>
                  <button onClick={() => toggleFavorite(film.id)}>
                    {favorites.includes(film.id) ? "❤️" : "🤍"}
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </>
  )
}

export default Home