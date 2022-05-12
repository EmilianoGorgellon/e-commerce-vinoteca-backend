const productosApi = require("../components/productos");
const authApi = require("../components/auth");
const userApi = require("../components/user");
module.exports = app =>{
    productosApi(app);
    authApi(app);
    userApi(app);
    app.get("/", (req, res)=> res.send("Todo ok!!!"));
}