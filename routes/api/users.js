const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");
const multer = require("multer");
const upload = multer();
/*---------- Public Routes ----------*/
router.post("/signup", upload.single("photo"), usersCtrl.signup);
router.post("/login", usersCtrl.login);

/*---------- Protected Routes ----------*/
router.get("/pokemonBag", usersCtrl.index)
router.delete("/pokemonBag", usersCtrl.deletePokemon)

module.exports = router;
