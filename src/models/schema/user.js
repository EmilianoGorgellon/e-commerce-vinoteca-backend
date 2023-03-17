const {Schema, model} = require("mongoose");
const joi = require("joi");
const name = joi.string().regex(new RegExp(/^[a-zA-Z\s]{3,}$/));
const email = joi.string().regex(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/));
const password = joi.string().regex(new RegExp(/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,16}/));
const imageUrl = joi.string();
const public_id = joi.string();
const validateEmail = joi.boolean();
const forget_password_code = joi.number().min(6);
const updated_at = joi.date();

const usersSchema = new Schema ({
    name: name.required(),
    email: email.required(),
    password: password.required(),
    imageUrl: imageUrl.required(),
    public_id: public_id.required(),
    validateEmail: validateEmail.default(false).required(),
    forget_password_code: forget_password_code.required(),
    updated_at: updated_at.required(),
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
}, {
    timestamps: true,
    versionKey: false
});

const usersModel = new model("users", usersSchema);

module.exports = {usersModel}
