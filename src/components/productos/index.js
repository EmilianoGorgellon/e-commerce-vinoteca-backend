const { Router } = require("express");
const router = Router();
const Producto_controller = require("./controllers/productos.controller");
const {verifyTokenAdmin} = require("../../utils/jwt/jwt");
const upload = require("../../middlewares/multer/multer")
module.exports = app => {
    app.use('/api/productos', router);
    router.get("/", Producto_controller.getProductDatas);
    router.get("/:name", Producto_controller.getProductByName);
    router.post("/",  upload.array('images', 3), verifyTokenAdmin, Producto_controller.saveProductData);
    router.put("/:id", verifyTokenAdmin, Producto_controller.updateProductData);
    router.delete("/:id", verifyTokenAdmin, Producto_controller.deleteProductData);
    router.delete("/", verifyTokenAdmin, Producto_controller.deleteAll);
};