import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import tokenService from '../../utils/tokenService'
import { Image, Container, Grid, Table, Button, Header, Label } from 'semantic-ui-react'


const PokemonDetailPage = () => {
  const { pokemonId } = useParams()
  const [pokemon, setPokemon] = useState(null)

  function fetchHelper(...args) {
    return fetch(...args).then(res => res.json())
  }

  async function fetchPokemon(pokemonUrl) {
    const newPokemon = await fetchHelper(pokemonUrl)
    setPokemon(newPokemon)
  }

  function handleClick() {
    const token = tokenService.getToken()
    fetch(`/api/pokemon/addPokemon/${pokemonId}`, {
      method: 'POST',
      headers: { Authorization: "Bearer " + token },
    })
  }

  useEffect(() => {
    fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  }, []);


  return (
    <div>
      <Container>
        <Header as='h2' icon textAlign='center'>
          <Image src={pokemon?.sprites.front_default} Bordered Rounded style={{ width: '250px', height: 'auto' }} />
          <Header.Content>{pokemon?.name.split(" ").map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join()}</Header.Content>
          {pokemon?.types?.map((types, index) => <Label key={index}>{types.type.name}</Label>)}
        </Header>
      </Container>

      <Container>
        <Grid centered>
          <Table celled striped textAlign="center">
            <Table.Body>
              <Table.Row>
                <Table.Cell collapsing> Index:</Table.Cell>
                <Table.Cell>{pokemon?.game_indices[0].game_index}</Table.Cell>
              </Table.Row>


              <Table.Row>
                <Table.Cell collapsing> Height:</Table.Cell>
                <Table.Cell>{Math.round(pokemon?.height * 0.32808399)} ft</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell collapsing> Weight:</Table.Cell>
                <Table.Cell>{Math.round(pokemon?.weight / 4.536)} lbs</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid>
        <Grid centered columns={3}>
          <Grid.Row>
            <Grid.Column>
              {pokemon?.stats.map(stats => <Label size='big'>{stats.stat.name}: {stats.base_stat}</Label>)}
            </Grid.Column>
          </Grid.Row>

          <Button animated type="submit" value={pokemonId} onClick={handleClick}>
            <Button.Content hidden>Catch</Button.Content>
            <Button.Content visible>
              <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" centered />
            </Button.Content>
          </Button>
        </Grid>
      </Container >
    </div>
  )
}

export default PokemonDetailPage