import gato from "./gato.gif"

function Usuario() {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>

      <h2>Usuario</h2>

      <img
        src={gato}
        alt="Gato bailando"
        width="200"
      />

    </div>
  )
}

export default Usuario