const auth = require("../services/auth.services");
const pino = require("../../../utils/pino/pino");
class Auth_controller {
    async login (req, res) {
        try {
            const response = await auth.loginService(req.body);
            if (typeof(response) === "string") return res.status(200).json(response)
            return await res.status(401).json(response)
        } catch (error) {
            pino.error(`Error en el sistema: ${error}`)
            return await res.status(500).json({"response": "Error en el servidor"})
        }
    }

    async register (req, res) {
        try {
            const data = {
                body: req.body,
                image: req.file
            }
            const response = await auth.signUpService(data);
            if (typeof(response) === "string") return res.status(200).json(response)
            return await res.status(401).json(response)
        } catch (error) {
            pino.error(`Error en el sistema: ${error}`)
            return await res.status(500).json({"response": "Error en el servidor"})
        }
    }
}
module.exports = new Auth_controller();