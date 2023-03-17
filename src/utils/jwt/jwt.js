const jwt = require("jsonwebtoken");    
const {config} = require("../../config");
const {usersModel} = require("../../models/schema/user");
const {rolesModel} = require("../../models/schema/role");

class JWT {
    async generateToken (_id, email) {
        return jwt.sign({_id, email}, config.secret_jwt, {
                expiresIn: 86400 // 1 day   
        })
    }

    async generateTokenEmail (name, email, image, validateEmail) {
        return jwt.sign({name, email, image, validateEmail}, config.secret_jwt, {
            expiresIn: 86400 // 1 day   
        })
    }

    async isAdminOrModerator (token) {
        try {
            const arrayRoles = [];
            const decoded = jwt.verify(token, config.secret_jwt);
            const userFound = await usersModel.findById({_id: decoded._id});
            const roles = await rolesModel.find({_id: {$in: userFound.roles}});  
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin" || roles[i].name === "moderator") {
                    arrayRoles.push(roles[i].name);
                }
            }
            return arrayRoles;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async verifyTokenFromEmail (token) {
        try {
            const decoded = jwt.verify(token, config.secret_jwt);
            const getUserByEmail =  await usersModel.find({email: decoded.email}, {password: 0, roles: 0})
            if (getUserByEmail.length === 0) throw new Error("Error: Usuario no encontrado");
            return getUserByEmail[0];
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

}


module.exports = new JWT();