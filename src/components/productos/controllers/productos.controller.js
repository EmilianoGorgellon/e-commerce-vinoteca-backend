let producto = require("../services/productos.service");
const pino = require("../../../utils/pino/pino");
class Producto_controller {
    async getProductDatas (req, res) {
        try {
            return await res.status(200).json(await producto.getProducts())
        } catch (error) {
            pino.error(`Error en obtener productos: ${error}`);
            return res.status(500).json({"response": `${error}`})
        }
    }

    async getProductByName (req, res) {
        try {
            return await res.status(200).json(await producto.getProductByName(req.params.name))
        } catch (error) {
            pino.error(`Error en obtener productos por nombre: ${error}`);
            return res.status(500).json({"response": `${error}`})
        }
    }

    async saveProductData (req, res) {
        try {
            const datas = {
                body: req.body,
                images: req.files
            }
            const response = await producto.saveProduct(datas);
            return await res.status(response.code).json(response.response);
        } catch (error) {
            pino.error(`Error en guardar el producto: ${error}`);
            return res.status(500).json(error);
        }
    }

    async updateProductData (req, res) {
        try {
            return await res.status(201).json(producto.updateProduct(req.body._id))
        } catch (error) {
            pino.error(`Error en actualizar el producto: ${error}`);
            return res.status(500).json({"response": `Error en actualizar producto: ${error}`})
        }
    }

    async deleteProductData (req, res) {
        try {
            return await res.status(200).json(producto.deleteProduct(req.body._id))
        } catch (error) {
            pino.error(`Error en eliminar producto: ${error}`);
            return res.status(500).json({"response": `Error en eliminar producto: ${error}`})
        }
    }

    async deleteAll (req, res) {
        try {
            return await res.status(200).json(producto.deleteAll());
        } catch (error) {
            pino.error(`Error en eliminar todos los productos: ${error}`);
            return res.status(500).json({"response": `Error en eliminar todos los productos: ${error}`})
        }
    }
}


module.exports = new Producto_controller();