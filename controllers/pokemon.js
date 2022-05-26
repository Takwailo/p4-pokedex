const fetch = require("node-fetch");
const User = require("../models/user");

module.exports = {
    index,
    addPokemon,
};

function fetchHelper(...args) {
    return fetch(...args).then((res) => res.json());
}

async function index(req, res) {
    try {
        const baseURL = "https://pokeapi.co/api/v2/pokemon/";
        const limit = "?limit=151";
        const pokemons = await fetchHelper(baseURL + limit);
        res.json({ data: pokemons });
    } catch (error) {
        return res.status(401).json(err);
    }
}

async function addPokemon(req, res) {
    try {
        const user = await User.findOne({ _id: req.user._id });
        user.pokemons.push(req.params.id)
        if (user.pokemons.length > 6){
            return res.status(400).json({ message: "too many pokemons"})
        }
        user.save()
        res.status(200).json();
    } catch (err) {
        return res.status(400).json(err);
    }
}
