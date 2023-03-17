const auth = require("../services/auth.services");
const pino = require("../../../utils/pino/pino");
class Auth_controller {
    async login (req, res) {
        try {
            const response = await auth.loginService(req.body);
            return await res.status(response.code).json(response.response);
        } catch (error) {
            pino.error(`Error en el sistema: ${error}`);
            return await res.status(500).json(`${error}`);
        }
    }

    async register (req, res) {
        try {
            const data = {
                body: req.body,
                image: req.file
            }
            const response = await auth.signUpService(data);
            return await res.status(response.code).json(response.response);
        } catch (error) {
            pino.error(`Error en el sistema: ${error}`);
            return await res.status(500).json(`${error}`);
        }
    }
   
    async newUser (req, res) {
        try {
            return res.status(200).json({"response": true});
        } catch (error) {
            return res.status(500).json({"response": false});
        }
    }
}
module.exports = new Auth_controller();