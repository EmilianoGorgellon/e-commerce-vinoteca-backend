const { Router } = require("express");
const router = Router();
const Producto_controller = require("./controllers/productos.controller");
const {verifyEmailByToken, isAdmin} = require("../../middlewares/jwt/jwt");
const upload = require("../../middlewares/multer/multer")
module.exports = app => {
    app.use('/api/productos', router);
    router.get("/", Producto_controller.getProductDatas);
    router.get("/:name", Producto_controller.getProductByName);
    router.post("/", [verifyEmailByToken, isAdmin, upload.array('images', 3)], Producto_controller.saveProductData);
    router.put("/:id", [verifyEmailByToken, isAdmin], Producto_controller.updateProductData);
    router.delete("/:id", [verifyEmailByToken, isAdmin], Producto_controller.deleteProductData);
    router.delete("/", [verifyEmailByToken, isAdmin], Producto_controller.deleteAll);
};