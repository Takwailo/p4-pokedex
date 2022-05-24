const express = require("express");
const router = express.Router();
const pokemonCtrl = require("../../controllers/pokemon");

/*---------- Public Routes ----------*/
router.get("/index", pokemonCtrl.index);
router.post("/addPokemon/:id", pokemonCtrl.addPokemon)


/*---------- Protected Routes ----------*/

module.exports = router;