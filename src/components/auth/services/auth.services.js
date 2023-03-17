const bcrypter = require("../../../utils/bcrypt/bcrypt");
const JWT = require("../../../utils/jwt/jwt");
const user = require("../../user/services/user.service");

class Auth {
    async signUpService(data) {
        try {
            return await user.saveUser(data);
        } catch (error) {
            return new Error(`Error en sistema: ${error}`);
        }
    }
    async loginService(data) {
        try {
            const userFound = await user.getUserByEmail(data.email);
            if (userFound.length === 0) return ({response: "Error, no existe cuenta con ese email", code: 403});
            const matchPassword = await bcrypter.comparePassword(data.password, userFound[0].password);
            if (!matchPassword) return ({response: "Error, contraseña incorrecta", code: 403});
            const token = await JWT.generateToken(userFound[0]._id, userFound[0].email);
            return {response: `${token}`, code: 200};
        } catch (error) {
            return new Error(error);
        }
    }
}

module.exports = new Auth();