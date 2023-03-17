const { Router } = require("express");
const router = Router();
const Auth_controller = require("./controllers/auth.controller");
const upload = require("../../middlewares/multer/multer");
const { checkExistingRole, verifyEmailByBody, isTokenReal } = require("../../middlewares/jwt/jwt");
module.exports = app => {
    app.use('/api/auth', router);
    router.post('/login', Auth_controller.login);
    router.post('/register',[checkExistingRole, verifyEmailByBody, upload.single('image')], Auth_controller.register);
    router.get("/newUser", isTokenReal, Auth_controller.newUser);
}