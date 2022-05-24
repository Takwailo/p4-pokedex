import { useEffect, useState } from "react";
import { PokemonCard } from "../../components/PokemonCard/PokemonCard";

function Homepage(props) {
    const [pokemons, setPokemons] = useState(null);

    function fetchHelper(...args) {
        return fetch(...args).then(res => res.json())
    }

    async function fetchPokemons() {
        const pokemonIndex = await fetchHelper("/api/pokemon/index");
        console.log("fetchPokemons", pokemonIndex)
        const pokemonUrls = pokemonIndex?.data?.results?.map(pokemon => pokemon.url)
        const newPokemons = await fetchPokemonDetails(pokemonUrls)
        console.log("fetchPokemonDetails", newPokemons)
        setPokemons(newPokemons)
    }

    function fetchPokemonDetails(pokemonUrls){
        return Promise.all(pokemonUrls.map(pokemonUrl => fetchHelper(pokemonUrl)))
    }

    useEffect(() => {
        fetchPokemons();
    }, []);

    return (
        <div className="homepage">
            {pokemons?.map(pokemon => <PokemonCard key={pokemon.id} {...pokemon}/>)}
        </div>
    );
}

export default Homepage;
