const axios = require("axios");
const {config} = require("../../../config");

class Payment_service {
  async create_payment (data_body, data_headers) {
      try {
        const user_data_token = data_headers.authorization;
        const url = "https://api.mercadopago.com/checkout/preferences";
        const body = {
          items: data_body.map((dato, i) => (
            {
              title: dato.name,
              picture_url: dato.imagesUrl[0],
              quantity: dato.quantity,
              unit_price: parseInt(dato.price)
            })),
          back_urls: {
            failure: `http://localhost:3000/payment/failure/${user_data_token}`,
            success: `http://localhost:3000/payment/success/${user_data_token}`
          },
          binary_mode: true,
          notification_url: "http://localhost:4000/api/payment/mp/notification"
        };

        const payment = await axios.post(url, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.access_token_mercadopago}`
          }
        });
        return payment.data;
      } catch (error) {
          throw new Error(`Error en crear pago: ${error}`)
      }
  }

  async create_notification () {
    try {
      return "xd"
    } catch (error) {
      throw new Error(`Error en generar notificacion: ${error}`)
    }
  }
}

module.exports = new Payment_service();