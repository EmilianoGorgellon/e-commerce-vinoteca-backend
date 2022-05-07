const nodemailer = require("nodemailer");
const { config } = require("../../config");
const user = config.nodemailer_user;
const pass = config.nodemailer_pw;
const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: true,
    auth: {
        user,
        pass
    }
});

class Nodemailer {
    async new_user_verification (data, token){
        try {
            const subject = "Verificacion de Email";
            const html = 
                `
                    <div style="display: block; width: 100%;">
                        <h1 style="text-align: center;">Hola ${data.name}, haga click en el siguiente enlace para confirmar su cuenta</h1>
                        <div style="display: flex; justify-content: space-evenly; width: 80%;">
                            <img style="width: 75px; object-fit: cover; border-radius: 50%;" src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/wine-bar-logo-brand-logo-template-design-467de904bec2855b56d72d5f58c91407_screen.jpg?ts=1574430397" alt="logo vino" />
                            <img style="width: 75px; object-fit: cover; border-radius: 50%; "src="${data.imageUrl}" alt="img-avatar" />
                        </div>
                        <a href="http://localhost:4000/api/auth/user/${token}" style="padding: 10px 20px; text-align: center; border-radius: 6px; font-size: 24px; background-color: #0077F9;">Confirmar Email</a>
                    </div>
                `; 
            const to = data.email;
            return await transport.sendMail({
                from:"E-commerce de Emilano <gorgellonemiliano@gmail.com>",
                to,
                subject,
                html
            });
        } catch (error) {
            throw new Error(`Error en enviar email: ${error}`);
        }
    }
}

module.exports = new Nodemailer();