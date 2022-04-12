const {usersModel} = require("../../../models/schema/user");
const cloudinary = require("../../../config/cloudinary");
const {config} = require("../../../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class Auth {
    async signUpService(data) {
        try {
            const userFound = await this.getUserByEmail(data.body.email);
            if (userFound.length !== 0) return new Error("Error ya existe un usuario con ese email")
            return await this.saveUser(data);
        } catch (error) {
            return new Error("Error in system")
        }
    }
    async signInService(data) {
        try {
            const userFound = await this.getUserByEmail(data.email);
            if (!userFound) return new Error("Error en email");
            const matchPassword = await this.comparePassword(data.password, userFound[0].password);
            if (!matchPassword) return new Error("Error en contraseña");
            const token = jwt.sign({name: userFound[0].name, email: userFound[0].email, image: userFound[0].imageUrl, isAdmin: userFound[0].isAdmin}, config.secret_jwt, {
                expiresIn: 86400 // 1 day   
            })
            return token;  
        } catch (error) {
            return new Error("Error in system")
        }
    }

    async encryptPassword(password) {
        try {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(password, salt);
        } catch (error) {
            return `response: Error`
        }
    }
    async comparePassword(password, password_db) {
        try {
            return await bcrypt.compare(password, password_db);
        } catch (error) {
            return `response: error en catch copmare password`
        }
    }
    async saveUser(data) {
        try {
            const {name, email, password, isAdmin } = data.body;
            const newPassword = await this.encryptPassword(password);
            const result_cloudinary = await cloudinary.v2.uploader.upload(data.image.path);
            const imageUrl = result_cloudinary.secure_url;
            const public_id = result_cloudinary.public_id;
            const newUser = {
                name,
                email,
                password: newPassword,
                imageUrl,
                public_id,
                isAdmin: isAdmin ? true : false,
                created_at: new Date()
            }
            const result = await usersModel.create(newUser);
            const token = jwt.sign({name: result.name, email: result.email, image: result.imageUrl, isAdmin: result.isAdmin}, config.secret_jwt, {
                expiresIn: 84600 // 1 day
            })
            return token;
        } catch (error) {
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
    async getUserById(_id) {
        try {
            return await usersModel.find({_id})
        } catch (error) {
            return new Error("Error in sytem")
        }
    }
}

module.exports = new Auth;