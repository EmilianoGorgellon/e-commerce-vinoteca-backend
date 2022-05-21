let {productoModel} = require("../../../models/schema/productos");
const Cloudinary = require("../../../utils/cloudinary/cloudinary");
const Nodemailer = require("../../../utils/nodemailer/nodemailer");
class Productos {
    async getProducts() {
        try {
            return await productoModel.find({})
        } catch (error) {
            throw new Error("Error en obtener producto")
        }
    }
    async getProductByName(name) {
        try {
            return await productoModel.find({"name": name})
        } catch (error) {
            throw new Error("Error en obtener producto por nombre")

        }
    }
    async saveProduct(body) {
        try {
            console.log("En service de productos");
            return ""
            // return await productoModel.create(body);
        } catch (error) {
            throw new Error("Error en guardar producto")
        }
    }

    async updateProduct(_id) {
        try {
            return await productoModel.updateOne({_id: _id}, {"name":"hola"})
        } catch (error) {
            throw new Error("Error en actualizar producto")
        }
    }
    
    async deleteProduct(_id) {
        try {
            return await productoModel.deleteOne({_id: _id})
        } catch (error) {
            throw new Error("Error en eliminar producto")
        }
    }

    async deleteAll() {
        try {
            return await productoModel.deleteMany({})
        } catch (error) {
            throw new Error("Error en eliminar todos los productos")
        }
    }
}

module.exports = new Productos;