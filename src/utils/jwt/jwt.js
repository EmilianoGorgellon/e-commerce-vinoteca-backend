const jwt = require("jsonwebtoken");    
const {config} = require("../../config");
const {usersModel} = require("../../models/schema/user");
class JWT {
    async generateToken (name, email, image, isAdmin) {
        try {
            return jwt.sign({name, email, image, isAdmin}, config.secret_jwt, {
                expiresIn: 86400 // 1 day   
            })
        } catch (error) {
            throw new Error(`Error no se pudo generar el token: ${error}`);
        }
    }
    
    async verifyTokenAdmin(req, res, next) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, config.secret_jwt);
            const getUserByEmail = await usersModel.find({email: decoded.name.email})
            if (getUserByEmail.length === 0) return res.status(403).json(`Error: No usuario encontrado`);
            if (!decoded.name.isAdmin) return res.status(401).json(`Usuario no tiene acceso a esta accion`);
            next(); 
        } catch (error) {
            return res.status(403).json(`Token no autorizado: ${error}`);
        }
    }

    async verifyTokenFromEmail (token) {
        try {
            const decoded = jwt.verify(token, config.secret_jwt);
            const getUserByEmail =  await usersModel.find({email: decoded.name.email})
            if (getUserByEmail.length === 0) throw new Error("Error: Usuario no encontrado");
            return getUserByEmail[0];
        } catch (error) {
            throw new Error(`Token no autorizado: ${error}`);
        }
    }

    async isTokenReal (req, res, next) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, config.secret_jwt);
            next();
        } catch (error) {
            return res.status(403).json(`Token no autorizado: ${error}`);
        }
    }
}


module.exports = new JWT();