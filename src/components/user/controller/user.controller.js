const user = require("../services/user.service");
const { verifyTokenFromEmail, isAdminOrModerator } = require("../../../utils/jwt/jwt");

class User_controller {
    async verifyUser (req, res) {
        try {
            const user_data = await verifyTokenFromEmail(req.params.token);
            await user.activateEmail(user_data);
            res.status(200).send(`
                <div style="display: flex; width: 80%; justify-content:center; align-items:center; flex-direction: column">
                    <h1>${user_data.name} su validacion de correo electronico fue satisfactoria, ya puede iniciar sesion, cerrar esta pestaña y redirigirse a la pagina principal: 
                        <a href="http://localhost:3000/">Pagina principal</a>
                    </h1>
                        <img style="width: 350px; object-fit:" contain; src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/wine-bar-logo-brand-logo-template-design-467de904bec2855b56d72d5f58c91407_screen.jpg?ts=1574430397" alt="page-logo"/>
                </div>`);
        } catch (error) {
            return await res.status(500).json({"response": `Error en la verificacion del usuario: ${error}`});
        }
    }

    async updateProfile (req, res) {
        try {
            const response = await user.updateUser(req);
            return res.status(response.code).json(response.response);
        } catch (error) {
            console.log("pasa por error")
            console.log(`Error: ${error}`)
            return await res.status(500).json({"response": `${error}`});
        }
    }

    async userToAdmin (req, res) {
        try {
            const response = await user.userToAdmin(req.body.email);
            return res.status(response.code).json(response.response);
        } catch (error) {
            return await res.status(500).json({"response": `Error en dar de alta administrador: ${error}`});
        }
    }

    async userToModerator (req, res) {
        try {
            const response = await user.userToModerator(req.body.email);
            return res.status(response.code).json(response.response);
        } catch (error) {
            return await res.status(500).json({"response": `Error en dar de alta administrador: ${error}`});
        }
    }

    async forget_password (req, res) {
        try {
            const response = await user.forgetPassword(req.body.email);
            return res.status(response.code).json({"response": `${response.response}`});
        } catch (error) {
            return await res.status(500).json({"response": `${error}`});
        }
    }

    async recovery_password (req, res) {
        try {
            const response = await user.verification_forget_password(req.body.email, req.body.code, req.body.new_password);
            res.status(response.code).json({response: response.response});
        } catch (error) {
            return await res.status(500).json({"response": `${error}`});
        }
    }

    async getDataUser (req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const user_data = await verifyTokenFromEmail(token);
            return res.status(200).json({user_data});
        } catch (error) {
            return await res.status(500).json({"response": `Error en obtener usuario: ${error}`})
        }
    }

    async getRoleView (req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const roleView = await isAdminOrModerator(token);
            return res.status(200).json(roleView);
        } catch (error) {
            return await res.status(500).json({"response": `${error}`})
        }
    }
}

module.exports = new User_controller();