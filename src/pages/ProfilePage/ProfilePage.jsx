import { useState, useEffect } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import tokenService from '../../utils/tokenService'

export default function ProfilePage({ user }) {
    const [pokemons, setPokemons] = useState(null);
    const token = tokenService.getToken()

    function fetchHelper(...args) {
        return fetch(...args).then(res => res.json())
    }

    async function fetchPokemons() {
        const pokemonIds = await fetchHelper('/api/users/pokemonBag', {
            method: 'GET',
            headers: { Authorization: "Bearer " + token },
        })
        const userPokemons = await Promise.all(pokemonIds.map(pokemonId => fetchHelper(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)))
        setPokemons(userPokemons)
    }

    function handleDelete(index) {
        return function () {
            const newPokemons = [...pokemons]
            newPokemons.splice(index, 1)
            setPokemons(newPokemons)
            fetch('/api/users/pokemonBag', {
                method: 'DELETE',
                headers: { 
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPokemons.map(pokemon => pokemon.id))
            })
        }
    }

    useEffect(() => {
        fetchPokemons();
    }, []);

    return (
        <div className="profilePage">
            <h1>{user.username}</h1>
            <img src={user.photoUrl} />
            {pokemons?.map((pokemon, index) => <PokemonCard key={index} withDeleteButton={true} handleDelete={handleDelete(index)} {...pokemon} />)}
        </div>
    )
}

