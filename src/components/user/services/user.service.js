const {usersModel} = require("../../../models/schema/user");
const Cloudinary = require("../../../utils/cloudinary/cloudinary");
const bcrypter = require("../../../utils/bcrypt/bcrypt");
const JWT = require("../../../utils/jwt/jwt");
const Nodemailer = require("../../../utils/nodemailer/nodemailer");
const { rolesModel } = require("../../../models/schema/role");

class User {

    async saveUser(data) {
        try {
            const {name, email, password, roles} = data.body;
            const newPassword = await bcrypter.encryptPassword(password);
            const result_cloudinary = await Cloudinary.generateImagen(data.image.path);
            let newUser = {
                name,
                email,
                password: newPassword,
                imageUrl: result_cloudinary[0],
                public_id: result_cloudinary[1],      
                validateEmail: false
            }
            if (roles) {
                // Busco que los roles que me dio el usuario exista en mi base de datos y si existe mapeo y guardo el id
                const foundRoles = await rolesModel.find({name: {$in: [roles]}});
                newUser.roles = foundRoles.map(role => role._id);
            } else {
                // Si no existe guardo solo el id de user que es el comun
                const role = await rolesModel.findOne({name: "user"});
                newUser.roles = [role._id];
            }
            newUser = await usersModel.create(newUser);
            const token = await JWT.generateTokenEmail(newUser.name, newUser.email, newUser.imageUrl, newUser.validateEmail);
            await Nodemailer.new_user_verification(newUser.email, token);
            return {response: `Su usuario ya fue creado, confirme su email en su casilla ${email} e inicie sesion`, code: 200};

        } catch (error) {
            throw new Error(`Error en guardar usuario: ${error}`)
        }
    }

    async updateUser(req) {
        try {
            const data_user = await JWT.verifyTokenFromEmail(req.headers.authorization.split(" ")[1]);
            if (req.body.name === data_user.name && req.file === undefined) return ({response: "Error no hay nada para actualizar", code: 403});
            if (req.file === undefined && req.body.name !== data_user.name) {
                await usersModel.updateOne({_id: data_user._id}, {name: req.body.name});
            } else {
                await Cloudinary.deleteImage(data_user.public_id);
                const result_cloudinary = await Cloudinary.generateImagen(req.file.path);
                if (req.file !== undefined && req.body.name === data_user.name) {
                    const updateOnlyImage = {   
                        imageUrl: result_cloudinary[0],
                        public_id: result_cloudinary[1]
                    }
                    await usersModel.updateOne({_id: data_user._id}, {...updateOnlyImage});
                } else {
                    const updateUser = {
                        name: req.body.name,
                        imageUrl: result_cloudinary[0],
                        public_id: result_cloudinary[1]
                    }
                    await usersModel.updateOne({_id: data_user._id}, {...updateUser});
                }
            }
            const userFound = await usersModel.findById({_id: data_user._id});
            const token = await JWT.generateToken(userFound._id, userFound.email);
            return {response: `${token}`, code: 201};
        } catch (error) {
            throw new Error(error);
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
            const rolAdmin = await rolesModel.find({name: {$in: ["admin"]}});
            await usersModel.updateOne({_id: get_user[0]._id}, {roles: [rolAdmin[0]._id]});
            return {response: `El usuario ${email} fue dado de alta como administrador`, code: 201};
        } catch (error) {
            throw new Error(`No se pudo actualizar a administrador: ${error}`);
        }
    }
    
    async userToModerator (email) {
        try { 
            const get_user = await this.getUserByEmail(email);
            const rolModerator = await rolesModel.find({name: {$in: ["moderator"]}});
            await usersModel.updateOne({_id: get_user[0]._id}, {roles: [rolModerator[0]._id]});
            return {response: `El usuario ${email} fue dado de alta como moderador`, code: 201};
        } catch (error) {
            throw new Error(`No se pudo actualizar a moderador: ${error}`);
        }
    }

    async forgetPassword (email) {
        try {
            const get_user = await this.getUserByEmail(email);
            if (get_user.length === 0) return ({response: `Error no se detecto usuario con ese email ${email}`, code: 401});
            const codePW = await this.code_forget_password(email);
            await Nodemailer.email_forget_password(email, codePW);
            return ({response: `Se le mando mail a  ${email}`, code: 200});
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
    
    async code_forget_password (email) {
        try {
            const codePW = Math.floor(100000 + Math.random()*900000);
            await usersModel.updateOne({email: email}, {forget_password_code: codePW}, {validateEmail: true});
            return codePW;
        } catch (error) {
            throw new Error (`Obtener codigo para recuperar contraseña incorrecto: ${error}`);
        }
    }

    async verification_forget_password (email, codePW, new_password) {
        try {
            const get_user = await this.getUserByEmail(email);
            if (get_user.length === 0) return ({response: `Error: No encontro usuario con ese email ${email}`, code: 401});
            if (get_user[0].forget_password_code !== codePW) return ({response: `Error: El codigo no es correcto ${codePW}`, code: 401});
            const password = await bcrypter.encryptPassword(new_password);
            await usersModel.updateOne({_id: get_user[0]._id}, {password: password, validateEmail: true});
            return {"response": "Vuelva a iniciar sesion con la nueva contraseña", code: 201};
        } catch (error) {
            throw new Error (`${error}`);
        }
    }

}

module.exports = new User();