const productosApi = require("../components/productos");
const authApi = require("../components/auth");
module.exports = app =>{
    productosApi(app);
    authApi(app);
    app.get("/", (req, res)=> res.send("Todo ok!!!"));
}