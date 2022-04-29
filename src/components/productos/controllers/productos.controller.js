let producto = require("../services/productos.service");
const pino = require("../../../utils/pino/pino");
class Producto_controller {
    async getProductDatas (req, res) {
        try {
            return await res.json(await producto.getProducts())
        } catch (error) {
            pino.error(`Error en obtener productos: ${error}`);
            return res.status(500).json({"response": "Error en el servidor"})
        }
    }

    async getProductByName (req, res) {
        try {
            return await res.json(await producto.getProductByName(req.params.name))
        } catch (error) {
            pino.error(`Error en obtener productos por nombre: ${error}`);
            return res.status(500).json({"response": "Error en el servidor"})
        }
    }

    async saveProductData (req, res) {
        try {
            return await res.json(producto.saveProduct(req.body))
        } catch (error) {
            pino.error(`Error en guardar el producto: ${error}`);
            return res.status(500).json({"response": "Error en el servidor"})
        }
    }

    async updateProductData (req, res) {
        try {
            return await res.json(producto.updateProduct(req.body._id))
        } catch (error) {
            pino.error(`Error en actualizar el producto: ${error}`);
            return res.status(500).json({"response": "Error en el servidor"})
        }
    }

    async deleteProductData (req, res) {
        try {
            return await res.json(producto.deleteProduct(req.body._id))
        } catch (error) {
            pino.error(`Error en eliminar producto: ${error}`);
            return res.status(500).json({"response": "Error en el servidor"})
        }
    }

    async deleteAll (req, res) {
        try {
            return await res.json(producto.deleteAll());
        } catch (error) {
            pino.error(`Error en eliminar todos los productos: ${error}`);
            return res.status(500).json({"response": "Error en el servidor"})
        }
    }
}


module.exports = new Producto_controller();