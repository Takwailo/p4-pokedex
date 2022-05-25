import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import tokenService from '../../utils/tokenService'
import { Segment, Image } from 'semantic-ui-react'


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
    <div className="pokemonDetailPage">
      <Image src={pokemon?.sprites.front_default} size="medium" floated='left' />
      <h1>{pokemon?.name}</h1>
      {pokemon?.types[0].type.name }
      <button type="submit" value={pokemonId} onClick={handleClick}>Catch Pokemon</button>
    </div>

  )
}

export default PokemonDetailPage