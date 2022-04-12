let express = require("express");
let router = express.Router();
const { signIn, signUp } = require("../components/auth/controllers/auth.controller");

router.post('/signin', signIn);
router.post('/signup', signUp)

module.exports = router; 