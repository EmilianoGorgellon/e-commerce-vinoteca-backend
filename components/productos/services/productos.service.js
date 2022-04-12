let {productoModel} = require("../../../models/schema/productos")
class Productos {
    async getProducts() {
        try {
            return await productoModel.find({})
        } catch (error) {
            console.log("error");
        }
    }
    async getProductByName(name) {
        try {
            return await productoModel.find({"name": name})
        } catch (error) {
            console.log(error);
        }
    }
    async saveProduct(body) {
        try {
            return await productoModel.create(body);
        } catch (error) {
            console.log("error")
        }
    }

    async updateProduct(_id) {
        try {
            return await productoModel.updateOne({_id: _id}, {"name":"hola"})
        } catch (error) {
            console.log("error");
        }
    }
    
    async deleteProduct(_id) {
        try {
            return await productoModel.deleteOne({_id: _id})
        } catch (error) {
            console.log("error");
        }
    }

    async deleteAll() {
        try {
            return await productoModel.deleteMany({})
        } catch (error) {
            console.log("error");
        }
    }
}

module.exports = new Productos;