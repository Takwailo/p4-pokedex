import { useNavigate } from "react-router-dom";

export const PokemonCard = ({ id, name, sprites }) => {

  let navigate = useNavigate()

  function handleClick() {
    navigate(`/pokemonDetail/${id}`)
  }

  return (
    <div className="pokemonCard" key={id} onClick={handleClick} data-id={id}>
      <img src={sprites.front_default}></img>
      <p >{name}</p>
    </div>
  )
}
