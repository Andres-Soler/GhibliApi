import { useParams } from "react-router-dom"

interface Film {
  id: string
  title: string
  description: string
  director: string
  release_date: string
  image: string
}

interface Props {
  detalles: Film[]
}

function Detalles({ detalles }: Props) {

  const { id } = useParams()

  const pelicula = detalles.find((p) => p.id === id)

  if (!pelicula) {
    return <p>Película no encontrada</p>
  }

  return (
    <>
      <h2>{pelicula.title}</h2>
      <img src={pelicula.image} width="200" />

      <p><strong>Director:</strong> {pelicula.director}</p>
      <p><strong>Año:</strong> {pelicula.release_date}</p>
      <p><strong>Descripción:</strong> {pelicula.description}</p>
    </>
  )
}

export default Detalles