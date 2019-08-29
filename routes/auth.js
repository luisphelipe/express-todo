var express = require("express");
var router = express.Router();

const auth = require("../controllers/auth.controller");

// Create a new User
router.post("/signup", auth.signup);
router.post("/login", auth.login);

module.exports = router;
