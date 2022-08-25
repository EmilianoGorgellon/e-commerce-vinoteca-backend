const { Router } = require("express");
const router = Router();
const Auth_controller = require("./controllers/auth.controller");
const upload = require("../../middlewares/multer/multer");
module.exports = app => {
    app.use('/api/auth', router);
    router.post('/login', Auth_controller.login);
    router.post('/register', upload.single('image'), Auth_controller.register);
}