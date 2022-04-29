let {Schema, model} = require("mongoose");
let joi = require("joi");
let id = joi.number();
let name = joi.string().min(3);
let description = joi.string().min(3);
let price = joi.number();
let image = joi.array();
let category = joi.string().min(3);
let stock = joi.number();

let productosSchema = new Schema ({
    id: id.required(),
    name: name.required(),
    description: description.required(),
    price: price.required(),
    image: image.required(),
    category: category.required(),
    stock: stock.required()
})
const productoModel = new model("vinotecas", productosSchema);

module.exports = {productoModel}
