const productosApi = require("../components/productos");
const authApi = require("../components/auth");
const userApi = require("../components/user");
const paymentApi = require("../components/payment");
module.exports = app =>{
    productosApi(app);
    authApi(app);
    userApi(app);
    paymentApi(app);
    app.get("/", (req, res)=> res.send("Todo ok!!!"));
}