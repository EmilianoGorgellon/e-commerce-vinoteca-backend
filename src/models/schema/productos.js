let {Schema, model} = require("mongoose");
let joi = require("joi");
const name = joi.string().min(3);
const description = joi.string().min(3);
const price = joi.number();
const category = joi.string().min(3);
const stock = joi.number();
const imagesUrl = joi.array();
const publics_id = joi.array();
const updated_at = joi.date();
let productosSchema = new Schema ({
    name: name.required(),
    description: description.required(),
    price: price.required(),
    category: category.required(),
    stock: stock.required(),
    imagesUrl: imagesUrl.required(),
    publics_id: publics_id.required(),
    updated_at: updated_at.required()
    }, {
        timestamps: true,
        versionKey: false
    })
const productoModel = new model("productos", productosSchema);

module.exports = {productoModel}