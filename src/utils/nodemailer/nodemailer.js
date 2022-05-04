const {createTransport} = require("nodemailer");
const { config } = require("../../config");
const user = config.nodemailer_user;
const pass = config.nodemailer_pw;
const transport = createTransport({
    service: 'gmail',
    port: 587,
    secure: true,
    auth: {
        user,
        pass
    }
});

class Nodemailer {
    async new_user_verification (data){
        try {
            const subject = "Verificacion de Email";
            const html = 
                `
                    <form method="post" action="http://localhost:3000" style="display: block; width: 100%;">
                        <h1 style="text-align: center;">Hola ${data.name}, haga click en el siguiente enlace para confirmar su cuenta</h1>
                        <div style="display: flex; justify-content: center; width: 100%;">
                            <img style="width: 75px; object-fit: cover; margin: 5%;" src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/wine-bar-logo-brand-logo-template-design-467de904bec2855b56d72d5f58c91407_screen.jpg?ts=1574430397" alt="logo vino" />
                            <img style="width: 75px; object-fit: cover; margin: 5%;" src="https://res.cloudinary.com/dtt60hh34/image/upload/v1651524775/k4yhpn7axpbsl3dqpogx.png    " alt="img-avatar" />
                        </div>
                        <button type="submit" style="padding: 5px 10px; text-align: center; border-radius: 6px; font-size: 18px; background-color: #0077F9;">Confirmar Email</button>
                    </form>
                `; 
            
            return await transport.sendMail({
                from:`E-commerce de Emilano <${user}>`,
                to: `${data.email}`,
                subject,
                html
            });
        } catch (error) {
            throw new Error(`Error en enviar email: ${error}`);
        }
    }
}

module.exports = new Nodemailer();