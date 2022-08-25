const { Router } = require("express");
const router = Router();
const user_controller = require("./controller/user.controller");
const { verifyTokenAdmin } = require("../../utils/jwt/jwt");
module.exports = app => {
    app.use('/api/user', router);
    router.get("/:token", user_controller.verifyUser);
    router.post("/forget_password", user_controller.forget_password);
    router.post('/recovery_password', user_controller.recovery_password);
    router.put("/toAdmin", verifyTokenAdmin, user_controller.userToAdmin);
    router.put("/", user_controller.updateProfile);
}