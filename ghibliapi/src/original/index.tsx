import { useState, useEffect } from "react"
import "./style.css";

interface Film {
  id: string
  title: string
  description: string
  director: string
  release_date: string
  image: string
}

function Original() {

  const [films, setFilms] = useState<Film[]>([])
  const [randomFilm, setRandomFilm] = useState<Film | null>(null)
  const [sentimiento, setSentimiento] = useState("")

  useEffect(() => {
    fetch("https://ghibliapi.vercel.app/films/")
      .then(res => res.json())
      .then(data => setFilms(data))
  }, [])

  const detectarSentimiento = (descripcion: string) => {

    const texto = descripcion.toLowerCase()

    if (texto.includes("war") || texto.includes("fight")) {
      return "Intensa y dramática"
    }

    if (texto.includes("friend") || texto.includes("family")) {
      return "Emotiva y familiar"
    }

    if (texto.includes("magic") || texto.includes("spirit")) {
      return "Fantástica y mágica"
    }

    if (texto.includes("adventure") || texto.includes("journey")) {
      return "De aventura"
    }

    return "Relajante y reflexiva"
  }

  const recomendar = () => {

    const random = films[Math.floor(Math.random() * films.length)]

    setRandomFilm(random)

    const mood = detectarSentimiento(random.description)

    setSentimiento(mood)
  }

  return (
    <div className="pantalla">

      <div className="fondo"></div>

      <div className="panel">

        <h2>Recomendador de películas</h2>

        <button onClick={recomendar}>
          Recomiéndame una película
        </button>

        {randomFilm && (
          <div className="pelicula">

            <h3>{randomFilm.title}</h3>

            <img src={randomFilm.image} width="200" />

            <p><strong>Director:</strong> {randomFilm.director}</p>

            <p><strong>Año:</strong> {randomFilm.release_date}</p>

            <p><strong>Ambiente:</strong> {sentimiento}</p>

            <p className="descripcion">
              {randomFilm.description}
            </p>

          </div>
        )}

      </div>

    </div>
  )
}

export default Original