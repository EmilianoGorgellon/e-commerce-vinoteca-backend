// const {usersModel} = require("../../../models/schema/user");
// const Cloudinary = require("../../../utils/cloudinary/cloudinary");
const bcrypter = require("../../../utils/bcrypt/bcrypt");
const JWT = require("../../../utils/jwt/jwt");
// const Nodemailer = require("../../../utils/nodemailer/nodemailer");
const user = require("../../user/services/user.service");
class Auth {
    async signUpService(data) {
        try {
            const userFound = await user.getUserByEmail(data.body.email);
            if (userFound.length !== 0) return new Error("Error ya existe un usuario con ese email");
            return await user.saveUser(data);
        } catch (error) {
            console.log(error);
            return new Error("Error in system")
        }
    }
    async loginService(data) {
        try {
            const userFound = await user.getUserByEmail(data.email);
            if (!userFound) return new Error("Error en email");
            const matchPassword = await bcrypter.comparePassword(data.password, userFound[0].password);
            if (!matchPassword) return new Error("Error en contraseña"); 
            return await JWT.generateToken({name: userFound[0].name, email: userFound[0].email, image: userFound[0].imageUrl, isAdmin: userFound[0].isAdmin, validateEmail: userFound[0].validateEmail})
        } catch (error) {
            return new Error("Error in system")
        }
    }

    // async saveUser(data) {
    //     try {
    //         const {name, email, password } = data.body;
    //         const newPassword = await bcrypter.encryptPassword(password);
    //         const result_cloudinary = await Cloudinary.generateImagen(data.image.path);
    //         const newUser = {
    //             name,
    //             email,
    //             password: newPassword,
    //             imageUrl: result_cloudinary[0],
    //             public_id: result_cloudinary[1],      
    //             isAdmin: false,
    //             validateEmail: false,          
    //             created_at: new Date()
    //         }
    //         const result = await usersModel.create(newUser);
    //         const token = await JWT.generateToken({name:result.name, email: result.email, image: result.imageUrl, isAdmin: result.isAdmin})
    //         await Nodemailer.new_user_verification(newUser, token);
    //         return `Usuario creado`
    //     } catch (error) {
    //         throw new Error("Error in system: ", error)
    //     }
    // }
    // async getUserByEmail(email){
    //     try {
    //         return await usersModel.find({email: email})
    //     } catch (error) {
    //         throw new Error("Error in system")
    //     }
    // }

    // async updateUser (data_user) {
    //     try {
    //         return await usersModel.updateOne({_id: data_user._id}, {validateEmail: true})
    //     } catch (error) {
    //         throw new Error(`No se pudo actualizar el usuario: ${error}`)
    //     }
    // }
}

module.exports = new Auth();