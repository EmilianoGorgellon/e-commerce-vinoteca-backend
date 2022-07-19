const {Schema, model} = require("mongoose");
const joi = require("joi");
const name = joi.string().regex(new RegExp(/^[a-zA-Z\s]{3,}$/));
const email = joi.string().regex(new RegExp(/^([0-9a-z_\.\+-]+)@(gmail.com)$/));
const password = joi.string().regex(new RegExp(/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,14}/));
const imageUrl = joi.string();
const isAdmin = joi.boolean();
const public_id = joi.string();
const validateEmail = joi.boolean();
const created_at = joi.date();


const usersSchema = new Schema ({
    name: name.required(),
    email: email.required(),
    password: password.required(),
    imageUrl: imageUrl.required(),
    public_id: public_id.required(),
    isAdmin: isAdmin.default(false).required(),
    validateEmail: validateEmail.default(false).required(),
    created_at: created_at
});

const usersModel = new model("users", usersSchema);

module.exports = {usersModel}
