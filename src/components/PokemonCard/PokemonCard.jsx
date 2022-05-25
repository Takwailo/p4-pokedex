import { useNavigate } from "react-router-dom";

export default function PokemonCard({ id, name, sprites, withDeleteButton, handleDelete }) {
  let navigate = useNavigate()

  function handleClick() {
    navigate(`/pokemonDetail/${id}`)
  }

  return (
    <div className="pokemonCard" key={id} data-id={id}>
      <img src={sprites.front_default} onClick={handleClick}></img>
      <p >{name}</p>
      {withDeleteButton && <button type="submit" onClick={handleDelete}>Release</button>}
    </div>
  )
}
