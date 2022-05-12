const user = require("../services/user.service");
const { verifyTokenFromEmail } = require("../../../utils/jwt/jwt");

class User_controller {
    async verifyUser (req, res) {
        try {
            const user_data = await verifyTokenFromEmail(req.params.token);
            await user.activateEmail(user_data);
            res.send(`
                <div style="display: flex; width: 80%; justify-content:center; align-items:center; flex-direction: column">
                    <h1>${user_data.name} su validacion de correo electronico fue satisfactoria, ya puede iniciar sesion, cerrar esta pestaña y redirigirse a la pagina principal: 
                        <a href="http://localhost:3000/">Pagina principal</a>
                    </h1>
                        <img style="width: 350px; object-fit:" contain; src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/wine-bar-logo-brand-logo-template-design-467de904bec2855b56d72d5f58c91407_screen.jpg?ts=1574430397" alt="page-logo"/>
                </div>`)
        } catch (error) {
            return await res.status(500).json({"response": "Error en el servidor"});
        }
    }

    async updateProfile (req, res) {
        try {
            const response = await user.updateUser(req);
            return res.status(200).json({response})
        } catch (error) {
            console.log(error)
            return await res.status(500).json({"response": "Error en el servidor"})
        }
    }
}

module.exports = new User_controller();