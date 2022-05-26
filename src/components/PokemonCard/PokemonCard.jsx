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
        <Card.Header textAlign="center">{name.split(" ").map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join()}</Card.Header>
      </Card.Content>
      {withDeleteButton && <Button type="submit" onClick={handleDelete}>Release</Button>}
    </Card>
  )
}
