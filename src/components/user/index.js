const { Router } = require("express");
const router = Router();
const user_controller = require("./controller/user.controller");
const { verifyEmailByToken, isAdmin, isTokenReal } = require("../../middlewares/jwt/jwt");
module.exports = app => {
    app.use('/api/user', router);
    router.get("/", isTokenReal, user_controller.getDataUser);
    router.get("/roleView", isTokenReal, user_controller.getRoleView);
    router.get("/:token", user_controller.verifyUser);
    router.post("/forget_password", user_controller.forget_password);
    router.post('/recovery_password', user_controller.recovery_password);
    router.put("/toAdmin", [verifyEmailByToken, isAdmin], user_controller.userToAdmin);
    router.put("/toModerator", [verifyEmailByToken, isAdmin], user_controller.userToModerator);
    router.put("/", user_controller.updateProfile);
}