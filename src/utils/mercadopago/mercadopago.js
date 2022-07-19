const mercadopago = require("mercadopago");
const { config } = require("../../config")
mercadopago.configure({
    access_token: config.access_token_mercadopago
});

