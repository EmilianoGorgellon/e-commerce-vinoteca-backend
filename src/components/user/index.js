const { Router } = require("express");
const router = Router();
const user_controller = require("./controller/user.controller");
module.exports = app => {
    app.use('/api/user', router);
    router.put("/", user_controller.updateProfile);
    router.get("/:token", user_controller.verifyUser);
}