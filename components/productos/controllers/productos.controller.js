let producto = require("../services/productos.service");

const getProductDatas = async (req, res) => {
    return await res.json(await producto.getProducts())
}

const getProductByName = async (req, res) => {
    return await res.json(await producto.getProductByName(req.params.name))
}

const saveProductData = async(req, res) => {
    return await res.json(producto.saveProduct(req.body))
}

const updateProductData = async (req, res) => {
    return await res.json(producto.updateProduct(req.body._id))
}

const deleteProductData = async (req, res) => {
    return await res.json(producto.deleteProduct(req.body._id))
}

const deleteAll = async (req, res) => {
    return await res.json(producto.deleteAll())
}

module.exports = {getProductDatas, saveProductData, updateProductData, deleteProductData, deleteAll, getProductByName };