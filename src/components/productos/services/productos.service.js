let {productoModel} = require("../../../models/schema/productos");
const Cloudinary = require("../../../utils/cloudinary/cloudinary");
class Productos {
    async getProducts() {
        try {
            return await productoModel.find({});
        } catch (error) {
            throw new Error(`Error en obtener productos: ${error}`)
        }
    }
    async getProductByName(name) {
        try {
            return await productoModel.find({"name": name})
        } catch (error) {
            throw new Error(`Erro en obtener producto por nombre: ${error}`);
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
            return await productoModel.create(new_product);
        } catch (error) {
            throw new Error(`Error en guardar producto: ${error}`);
        }
    }

    async updateProduct(_id) {
        try {
            return await productoModel.updateOne({_id: _id}, {"name":"hola"});
        } catch (error) {
            throw new Error(`Error en actualizar producto: ${error}`);
        }
    }
    
    async deleteProduct(_id) {
        try {
            return await productoModel.deleteOne({_id: _id})
        } catch (error) {
            throw new Error(`Error en eliminar producto por id`)
        }
    }

    async deleteAll() {
        try {
            return await productoModel.deleteMany({})
        } catch (error) {
            throw new Error(`Error en eliminar todos los productos: ${error}`)
        }
    }
}

module.exports = new Productos;