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
            const token = await JWT.generateToken({name:newUser.name, email: newUser.email, image: newUser.imageUrl, isAdmin: newUser.isAdmin, public_id: newUser.public_id})
            await Nodemailer.new_user_verification(newUser, token);
            return `Usuario creado`
        } catch (error) {
            throw new Error("Error in system: ", error)
        }
    }

    async updateUser(req) {
        try {
            const data_user = await JWT.verifyTokenFromEmail(req.headers.authorization.split(" ")[1]);
            if (req.body.name === data_user.name && req.file === undefined) return new Error("Error no hay nada para actualizar");
            if (req.file === undefined && req.body.name !== data_user.name) return await usersModel.updateOne({_id: data_user._id}, {name: req.body.name})
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
            throw new Error("Error in system: ", error);
        }
    }

    async getUserByEmail(email){
        try {
            return await usersModel.find({email: email})
        } catch (error) {
            throw new Error("Error in system")
        }
    }

    async activateEmail (data_user) {
        try {
            return await usersModel.updateOne({_id: data_user._id}, {validateEmail: true})
        } catch (error) {
            throw new Error(`No se pudo actualizar el usuario: ${error}`)
        }
    }

    async userToAdmin (email) {
        try { 
            const get_user = await this.getUserByEmail(email);
            return await usersModel.updateOne({_id: get_user[0].id}, {isAdmin: true});
        } catch (error) {
            throw new Error(`No se pudo actualizar a administrador: ${error}`)
        }
    }
}

module.exports = new User();