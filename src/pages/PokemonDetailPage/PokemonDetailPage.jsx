import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import tokenService from '../../utils/tokenService'
import { Image, Container, Grid, Table, Button } from 'semantic-ui-react'


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
    <Container>
      <Grid centered>
        <Grid.Column width={5}>
          <Image src={pokemon?.sprites.front_default} size='big' rounded />
        </Grid.Column>
        <Grid.Column width={5}>
          <Table celled striped textAlign="center">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan='3'><h1>{pokemon?.name.split(" ").map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join()}</h1></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell collapsing> Type:</Table.Cell>
                {pokemon?.types?.map((types, index) => <Table.Cell key={index}>{types.type.name}</Table.Cell> )}
              </Table.Row>
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

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='3'>
                  <Button animated type="submit" value={pokemonId} onClick={handleClick}>
                    <Button.Content hidden>Catch</Button.Content>
                    <Button.Content visible>
                      <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" centered />
                    </Button.Content>
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Grid.Column>
      </Grid>
    </Container >
  )
}

export default PokemonDetailPage