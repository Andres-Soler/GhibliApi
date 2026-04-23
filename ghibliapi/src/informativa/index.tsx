import perfil from "./perfil.png"

function Informativa() {

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      
      <img
        src={perfil}
        alt="Foto de perfil"
        width="200"
        style={{ borderRadius: "50%" }}
      />

      <h2>Andrés Felipe Soler Sepulveda - GatoMeowMiau</h2>

      <p>Este es mi catalogo Ghibli bonito.</p>

    </div>
  )
}

export default Informativa