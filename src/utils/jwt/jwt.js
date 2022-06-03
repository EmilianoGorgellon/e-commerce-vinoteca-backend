const jwt = require("jsonwebtoken");    
const {config} = require("../../config");
const {usersModel} = require("../../models/schema/user")
class JWT {
    async generateToken (name, email, image, isAdmin) {
        try {
            return jwt.sign({name, email, image, isAdmin}, config.secret_jwt, {
                expiresIn: 86400 // 1 day   
            })
        } catch (error) {
            throw new Error("No se pudo realizar el token")
        }
    }

    async verifyTokenAdmin(req, res, next) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            console.log("verifico token")
            console.log(token)
            const decoded = jwt.verify(token, config.secret_jwt);
            console.log(decoded)
            const getUserByEmail = await usersModel.find({email: decoded.name.email})
            if (getUserByEmail.length === 0) return res.status(401).json(`Error: No usuario encontrado`);
            console.log("Encontro usuario")
            if (!decoded.name.isAdmin) return res.status(401).json(`Usuario no tiene acceso a esta accion`);
            console.log("Salio bien el token")
            next();
        } catch (error) {
            console.log(error)
            return res.status(500).json(`Token no autorizado`)
        }
    }

    async verifyTokenFromEmail (token) {
        try {
            const decoded = jwt.verify(token, config.secret_jwt);
            const getUserByEmail =  await usersModel.find({email: decoded.name.email})
            if (getUserByEmail.length === 0) throw new Error("Error: Usuario no encontrado");
            return getUserByEmail[0];
        } catch (error) {
            throw new Error(`Token no autorizado: ${error}`)
        }
    }
}


module.exports = new JWT();