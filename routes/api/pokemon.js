const express = require("express");
const router = express.Router();
const pokemonCtrl = require("../../controllers/pokemon");

/*---------- Public Routes ----------*/
router.get("/index", pokemonCtrl.index);

/*---------- Protected Routes ----------*/
router.post("/addPokemon/:id", pokemonCtrl.addPokemon)

module.exports = router;