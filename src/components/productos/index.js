const { Router } = require("express");
const router = Router();
const Producto_controller = require("./controllers/productos.controller");
const {verifyToken} = require("../../utils/jwt/jwt");
module.exports = app => {
    app.use('/api/productos', router);
    router.get("/", Producto_controller.getProductDatas);
    router.get("/:name", Producto_controller.getProductByName);
    router.post("/", verifyToken, Producto_controller.saveProductData);
    router.put("/:id", verifyToken, Producto_controller.updateProductData);
    router.delete("/:id", verifyToken, Producto_controller.deleteProductData);
    router.delete("/", verifyToken, Producto_controller.deleteAll);
};