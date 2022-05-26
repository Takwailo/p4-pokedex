import { useEffect, useState } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import { Grid, Card, Container } from 'semantic-ui-react'

function Homepage(props) {
    const [pokemons, setPokemons] = useState(null);

    function fetchHelper(...args) {
        return fetch(...args).then(res => res.json())
    }

    async function fetchPokemons() {
        const pokemonIndex = await fetchHelper("/api/pokemon/index");
        const pokemonUrls = pokemonIndex?.data?.results?.map(pokemon => pokemon.url)
        const newPokemons = await fetchPokemonDetails(pokemonUrls)
        setPokemons(newPokemons)
        console.log(newPokemons)
    }

    function fetchPokemonDetails(pokemonUrls) {
        return Promise.all(pokemonUrls.map(pokemonUrl => fetchHelper(pokemonUrl)))
    }

    useEffect(() => {
        fetchPokemons();
    }, []);

    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <Container>
                    <Card.Group itemsPerRow={6} doubling>
                        {pokemons?.map(pokemon => <PokemonCard key={pokemon.id} {...pokemon} />)}
                    </Card.Group>
                    </Container>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default Homepage;
