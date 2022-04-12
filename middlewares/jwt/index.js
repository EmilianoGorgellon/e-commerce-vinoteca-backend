const jwt = require("jsonwebtoken");    
const {config} = require("../../config");
const auth = require ("../../components/auth/services/auth.services");

const verifyToken = async (req, res, next) => {
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

module.exports = {verifyToken}