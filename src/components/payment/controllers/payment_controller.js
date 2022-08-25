const pino = require("../../../utils/pino/pino");
const payment_service = require("../services/payment_service");
class Payment_controller {
    async get_payment_link (req, res) {
        try {
            const payment = await payment_service.create_payment(req.body, req.headers);
            return res.status(200).json({"response": payment.init_point});
        } catch (error) {
            pino.error(`Error en obtener link de pago: ${error}`);
            return res.status(500).json({"response": `${error}`});
        }
    }

    async notification_mp (req, res) {
        try {
            console.log("----------------------------- notifcation -----------------");
            console.log(req);
            console.log(res);
            const payment_notification = await payment_service.create_notification();
            return payment_notification;
        } catch (error) {
            pino.error(`Error en obtener link de pago: ${error}`);
            return res.status(500).json({"response": `${error}`});
        }
    }
}

module.exports = new Payment_controller();