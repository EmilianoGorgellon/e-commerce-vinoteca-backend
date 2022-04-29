const { Router } = require("express");
const router = Router();
const Auth_controller = require("./controllers/auth.controller");
module.exports = app => {
    app.use('/api/auth', router);
    
    router.post('/signin', Auth_controller.login);
    router.post('/signup', Auth_controller.singUp);
}