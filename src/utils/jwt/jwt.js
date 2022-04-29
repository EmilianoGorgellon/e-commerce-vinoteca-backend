const jwt = require("jsonwebtoken");    
const {config} = require("../../config");
const auth = require ("../../components/auth/services/auth.services");

class JWT {
    async generateToken (name, email, image, isAdmin) {
        try {
            return jwt.sign({name, email, image, isAdmin}, config.secret_jwt, {
                expiresIn: 86400 // 1 day   
            })
        } catch (error) {
            return res.json("Error")
        }
    }

    async verifyToken(req, res, next) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, config.secret_jwt);
            const getUserByEmail = await auth.getUserByEmail(decoded.email);
            if (getUserByEmail.length === 0) return res.status(401).json(`Error: No usuario encontrado`);
            if (!decoded.isAdmin) return res.json(`Usuario no tiene acceso a esta accion`);
            next();
        } catch (error) {
            return res.json(`Token no autorizado`)
        }
    }
}


module.exports = new JWT();