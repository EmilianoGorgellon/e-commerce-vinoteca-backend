const express = require("express");
const router = express.Router();
const {getUser, saveUser} = require("../components/users/controllers/users.controller");

router.get("/", getUser);
router.post('/upload', saveUser);

module.exports = router;