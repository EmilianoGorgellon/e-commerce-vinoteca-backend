const jwt = require("jsonwebtoken");    
const {config} = require("../../config");
const {usersModel} = require("../../models/schema/user");
const {rolesModel} = require("../../models/schema/role");

class middlewareJWT {
    async verifyEmailByBody (req, res ,next) {
        try {
            const userFound = await usersModel.find({email: req.body.email});
            if (userFound.length !== 0) return res.status(403).json({response: `Error ya existe un usuario con email ${req.body.email} `});
            next();
        } catch (error) {
            console.log("Veo error");
            console.log(error);
            return res.status(500).json(`${error}`);
        }
    }

    async verifyEmailByToken (req, res, next) {
        try {
            const token = await req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, config.secret_jwt);
            const getUserByEmail =  await usersModel.find({email: decoded.email})
            if (getUserByEmail.length === 0) return res.status(403).json("Error: Usuario no encontrado");
            next();
        } catch (error) {
            return res.status(403).json(`${error}`);
        }
    }

    async isAdmin(req, res, next) {
        try {
            const token = await req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, config.secret_jwt);
            const userFound = await usersModel.findById({_id: decoded._id});
            const roles = await rolesModel.find({_id: {$in: userFound.roles}});
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            return res.status(403).json(`Usuario no tiene acceso al rol admin`);

        } catch (error) {
            return res.status(403).json(`${error}`);
        }
    }

    async isModerator(req, res, next) {
        try {
            const token = await req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, config.secret_jwt);
            const userFound = await usersModel.findById({_id: decoded.name._id});
            const roles = await rolesModel.find({_id: {$in: userFound.roles}});            
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }
            return res.status(403).json(`Usuario no tiene acceso al rol moderador`);

        } catch (error) {
            return res.status(403).json(`${error}`);
        }
    }
    async isTokenReal (req, res, next) {
        try {
            const token = await req.headers.authorization.split(" ")[1];
            jwt.verify(token, config.secret_jwt);
            next();
        } catch (error) {
            return res.status(403).json(`${error}`);
        }
    }

    checkExistingRole (req, res, next) {
        const arrayRoles = JSON.parse(req.body.roles);
        if (arrayRoles.length === 0) return res.status(400).json({response: `No existen roles` });
        
        const ROLES = ["user", "moderator", "admin"];
        for (let i = 0; i < arrayRoles.length; i++) {
          if (!ROLES.includes(arrayRoles[i])) {
            return res.status(400).json({response: `Role ${arrayRoles[i]} no existe`});
          }
        }
      
        next();
      }; 
}

module.exports = new middlewareJWT();
