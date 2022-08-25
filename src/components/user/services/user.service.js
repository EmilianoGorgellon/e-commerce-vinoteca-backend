const {usersModel} = require("../../../models/schema/user");
const Cloudinary = require("../../../utils/cloudinary/cloudinary");
const bcrypter = require("../../../utils/bcrypt/bcrypt");
const JWT = require("../../../utils/jwt/jwt");
const Nodemailer = require("../../../utils/nodemailer/nodemailer");

class User {

    async saveUser(data) {
        try {
            const {name, email, password } = data.body;
            const newPassword = await bcrypter.encryptPassword(password);
            const result_cloudinary = await Cloudinary.generateImagen(data.image.path);
            const newUser = {
                name,
                email,
                password: newPassword,
                imageUrl: result_cloudinary[0],
                public_id: result_cloudinary[1],      
                isAdmin: false,
                validateEmail: false,          
                created_at: new Date()
            }
            await usersModel.create(newUser);
            const token = await JWT.generateToken({name:newUser.name, email: newUser.email, image: newUser.imageUrl, isAdmin: newUser.isAdmin, public_id: newUser.public_id});
            return await Nodemailer.new_user_verification(newUser, token);
        } catch (error) {
            throw new Error(`Error en guardar usuario: ${error}`)
        }
    }

    async updateUser(req) {
        try {
            const data_user = await JWT.verifyTokenFromEmail(req.headers.authorization.split(" ")[1]);
            if (req.body.name === data_user.name && req.file === undefined) return new Error("Error no hay nada para actualizar");
            if (req.file === undefined && req.body.name !== data_user.name) return await usersModel.updateOne({_id: data_user._id}, {name: req.body.name});
            await Cloudinary.deleteImage(data_user.public_id);
            const result_cloudinary = await Cloudinary.generateImagen(req.file.path);
            if (req.file !== undefined && req.body.name === data_user.name) {
                const updateOnlyImage = {   
                    imageUrl: result_cloudinary[0],
                    public_id: result_cloudinary[1]
                }
                return await usersModel.updateOne({_id: data_user._id}, {...updateOnlyImage});
            } else {
                const updateUser = {
                    name: req.body.name,
                    imageUrl: result_cloudinary[0],
                    public_id: result_cloudinary[1]
                }
                return await usersModel.updateOne({_id: data_user._id}, {...updateUser});
            }
        } catch (error) {
            throw new Error(`Error en actualizar usuario: ${error}`);
        }
    }

    async getUserByEmail(email){
        try {
            return await usersModel.find({email: email});
        } catch (error) {
            throw new Error(`Error en obtener usuario por email: ${error}`);
        }
    }

    async activateEmail (data_user) {
        try {
            return await usersModel.updateOne({_id: data_user._id}, {validateEmail: true});
        } catch (error) {
            throw new Error(`No se pudo actualizar el usuario: ${error}`);
        }
    }

    async userToAdmin (email) {
        try { 
            const get_user = await this.getUserByEmail(email);
            await usersModel.updateOne({_id: get_user[0]._id}, {isAdmin: true});
            return `El usuario ${email} fue dado de alta como administrador`;
        } catch (error) {
            throw new Error(`No se pudo actualizar a administrador: ${error}`);
        }
    }

    async forgetPassword (email) {
        try {
            const get_user = await this.getUserByEmail(email);
            if (get_user.length === 0) throw new Error(`Error no se detecto usuario con ese email ${email}`);
            const code = await this.code_forget_password(email);
            return await Nodemailer.email_forget_password(email, code);
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
    
    async code_forget_password (email) {
        try {
            const code = Math.floor(100000 + Math.random()*900000);
            await usersModel.updateOne({email: email}, {forget_password_code: code});
            return code;
        } catch (error) {
            throw new Error (`Error en obtener codigo para recuperar contraseña: ${error}`);
        }
    }

    async verification_forget_password (email, code, new_password) {
        try {
            const get_user = await this.getUserByEmail(email);
            if (get_user.length === 0) throw new Error(`Error no se encontro usuario con ese email ${email}`);
            if (get_user[0].forget_password_code !== code) throw new Error(`Error el codigo no es correcto ${code}`);
            const password = await bcrypter.encryptPassword(new_password);
            return await usersModel.updateOne({_id: get_user[0]._id}, {password: password});
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
}

module.exports = new User();