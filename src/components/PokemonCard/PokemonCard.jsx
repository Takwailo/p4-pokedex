import { useNavigate } from "react-router-dom";
import { Card, Button, Image } from 'semantic-ui-react'

export default function PokemonCard({ id, name, sprites, withDeleteButton, handleDelete }) {
  let navigate = useNavigate()

  function handleClick() {
    navigate(`/pokemonDetail/${id}`)
  }

  return (

    <Card className="pokemonCard" key={id} data-id={id}>
      <Image src={sprites.front_default} onClick={handleClick} />
      <Card.Content>
      <Card.Header>{name}</Card.Header>
      </Card.Content>
      {withDeleteButton && <Button type="submit" onClick={handleDelete}>Release</Button>}
    </Card>
  )
}
