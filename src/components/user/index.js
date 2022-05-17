const { Router } = require("express");
const router = Router();
const user_controller = require("./controller/user.controller");
const { verifyTokenAdmin } = require("../../utils/jwt/jwt")
module.exports = app => {
    app.use('/api/user', router);
    router.put("/", user_controller.updateProfile);
    router.put("/toAdmin", verifyTokenAdmin, user_controller.userToAdmin);
    router.get("/:token", user_controller.verifyUser);
}