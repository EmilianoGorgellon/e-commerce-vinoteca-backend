let {productoModel} = require("../../../models/schema/productos");
const Cloudinary = require("../../../utils/cloudinary/cloudinary");
const Nodemailer = require("../../../utils/nodemailer/nodemailer");
class Productos {
    async getProducts() {
        try {
            return await productoModel.find({});
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
    async saveProduct(datas) {
        try {
            const {name, description, price, category, stock } = datas.body;
            const result_cloudinary = await Cloudinary.generateMultipleImages(datas.images);
            const new_product = {
                name,
                description,
                price,
                category,
                stock,
                imagesUrl: result_cloudinary[0],
                publics_id: result_cloudinary[1],
                created_at: new Date(),
                updated_at: new Date()
            };
            console.log(new_product);
            // Subo producto pero falta rehacer nuevamente el schema
            return await productoModel.create(new_product);
        } catch (error) {
            throw new Error("Error en guardar producto: ", error)
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