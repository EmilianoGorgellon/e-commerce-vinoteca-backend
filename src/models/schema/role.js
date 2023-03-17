const {Schema, model} = require("mongoose");
const pino = require("../../utils/pino/pino");
const joi = require('joi');
const name = joi.string().regex(new RegExp(/^[a-zA-Z\s]{3,20}$/));

const rolesSchema = new Schema(
    {
        name: name.required()
    }, {
        versionKey: false
    }
);
const rolesModel = new model("Role", rolesSchema);
(async () => {
    try {
        rolesModel.estimatedDocumentCount(async function (err, count) {
            if (err){
                pino.error(err);
            } else {
                if (count > 0) return;

                const values = await Promise.all([
                    new rolesModel({name: "user"}).save(),
                    new rolesModel({name: "moderator"}).save(),
                    new rolesModel({name: "admin"}).save()
                ]);
        
                pino.info(values);
            }
        });

    } catch (error) {
        pino.error(error);
    }
})()
module.exports = {rolesModel};