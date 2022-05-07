const { Router } = require("express");
const router = Router();
const Auth_controller = require("./controllers/auth.controller");
module.exports = app => {
    app.use('/api/auth', router);
    
    router.post('/login', Auth_controller.login);
    router.post('/register', Auth_controller.register);
    router.get("/user/:token", Auth_controller.verifyUser);
}