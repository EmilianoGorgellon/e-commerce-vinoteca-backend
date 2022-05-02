const {usersModel} = require("../../../models/schema/user");
const Cloudinary = require("../../../utils/cloudinary/cloudinary");
const bcrypter = require("../../../utils/bcrypt/bcrypt");
const JWT = require("../../../utils/jwt/jwt");
const Nodemailer = require("../../../utils/nodemailer/nodemailer");
class Auth {
    async signUpService(data) {
        try {
            // const userFound = await this.getUserByEmail(data.body.email);
            // if (userFound.length !== 0) return new Error("Error ya existe un usuario con ese email");
            const a = await this.saveUser(data);
            console.log(a);
            return "xd";
        } catch (error) {
            console.log(error);
            return new Error("Error in system")
        }
    }
    async loginService(data) {
        try {
            const userFound = await this.getUserByEmail(data.email);
            if (!userFound) return new Error("Error en email");
            const matchPassword = await bcrypter.comparePassword(data.password, userFound[0].password);
            if (!matchPassword) return new Error("Error en contraseña"); 
            console.log("GENERARIA TOKEN")
            return await JWT.generateToken({name: userFound[0].name, email: userFound[0].email, image: userFound[0].imageUrl, isAdmin: userFound[0].isAdmin})
        } catch (error) {
            return new Error("Error in system")
        }
    }

    async saveUser(data) {
        try {
            const {name, email, password, isAdmin } = data.body;
            const newPassword = await bcrypter.encryptPassword(password);
            // const result_cloudinary = Cloudinary.generateImagen(data.image.path);
            const newUser = {
                name,
                email,
                password: newPassword,
                // imageUrl: result_cloudinary[0],
                // public_id: result_cloudinary[1],
                isAdmin: isAdmin ? true : false,
                created_at: new Date()
            }
            console.log("Ya cree la imagen")
            // const result = await usersModel.create(newUser);
            await Nodemailer.new_user_verification(newUser);
            // return await JWT.generateToken({name:result.name, email: result.email, image: result. imageUrl, isAdmin: result.isAdmin})
        } catch (error) {
            console.log("Error en crear usuario");
            return new Error("Error in system")
        }
    }
    async getUserByEmail(email){
        try {
            return await usersModel.find({email: email})
        } catch (error) {
            return new Error("Error in system")
        }
     
    }
}

module.exports = new Auth();