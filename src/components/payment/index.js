const { Router } = require("express");
const router = Router();
const payment_controller = require("./controllers/payment_controller");
const { isTokenReal } = require("../../utils/jwt/jwt")
module.exports = app => {
    app.use('/api/payment', router);
    router.post('/mp', isTokenReal, payment_controller.get_payment_link);
    router.post('/mp/notification', payment_controller.notification_mp);
};