let express = require("express");
let router = express.Router();
const {getProductDatas, saveProductData, updateProductData, deleteProductData, deleteAll, getProductByName} = require("../components/productos/controllers/productos.controller");
const {verifyToken} = require("../middlewares/jwt");

router.get("/", getProductDatas);
router.get("/:name", getProductByName);
router.post("/", verifyToken, saveProductData);
router.put("/:id", verifyToken, updateProductData);
router.delete("/:id", verifyToken, deleteProductData);
router.delete("/", verifyToken, deleteAll);

module.exports = router;