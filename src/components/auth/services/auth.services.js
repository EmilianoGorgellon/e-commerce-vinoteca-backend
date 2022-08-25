const bcrypter = require("../../../utils/bcrypt/bcrypt");
const JWT = require("../../../utils/jwt/jwt");
const user = require("../../user/services/user.service");
class Auth {
    async signUpService(data) {
        try {
            const userFound = await user.getUserByEmail(data.body.email);
            if (userFound.length !== 0) throw new Error("Error ya existe un usuario con ese email");
            return await user.saveUser(data);
        } catch (error) {
            return new Error(`Error en sistema: ${error}`);
        }
    }
    async loginService(data) {
        try {
            const userFound = await user.getUserByEmail(data.email);
            if (!userFound) return new Error("Error en email");
            const matchPassword = await bcrypter.comparePassword(data.password, userFound[0].password);
            if (!matchPassword) return new Error("Error en contraseña"); 
            return await JWT.generateToken({name: userFound[0].name, email: userFound[0].email, image: userFound[0].imageUrl, isAdmin: userFound[0].isAdmin, validateEmail: userFound[0].validateEmail});
        } catch (error) {
            return new Error(`Error en sistema: ${error}`);
        }
    }
}

module.exports = new Auth();