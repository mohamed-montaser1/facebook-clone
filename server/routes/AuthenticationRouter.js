const { signUp, login, me } = require("../controllers/AuthController");
const { verifyJWT } = require("../utilities/jwtHelper");

const router = require("express").Router();

// Sign up

router.post("/signup", signUp);

// Login

router.post("/login", login);

// Me

router.get("/me", verifyJWT, me);

module.exports = router;
