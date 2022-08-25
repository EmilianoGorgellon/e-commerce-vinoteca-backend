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
                        <a href="http://localhost:4000/api/user/${token}" style="padding: 10px 20px; text-align: center; border-radius: 6px; font-size: 24px; background-color: #0077F9;">Confirmar Email</a>
                    </div>
                `; 
            const to = data.email;
            await transport.sendMail({
                from:"E-commerce de Emilano <gorgellonemiliano@gmail.com>",
                to,
                subject,
                html
            });
            return `Se creo usuario y se envio email a ${data.email} para que confirme`;
        } catch (error) {
            throw new Error(`Error en enviar email: ${error}`);
        }
    }

    async email_forget_password (email, code){
        try {
            const subject = "Recupero de contraseña";
            const html = `
                <main style="width: 100%; display: flex; justify-items: center; justify-content: center; font-family:'Roboto', sans-serif;">
                    <div style="display: flex; width: 60%; justify-content:center; align-items:center; flex-direction: column; border-radius: 8px; border: 1px solid black;">
                        <img style="width: 20%; object-fit:cover; margin: 20px;" src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/wine-bar-logo-brand-logo-template-design-467de904bec2855b56d72d5f58c91407_screen.jpg?ts=1574430397" alt="logo-img"/>
                        <h3 style="font-size: 24px;">Su codigo para reestablecer la contraseña es: </h3>
                        <div style="padding: 5px 10px;display:flex; align-items:center; justify-content:center; height: 20px; margin-bottom: 30px; border: 1px solid black; border-radius: 6px; overflow: hidden;">
                            <p style="text-align: center; padding: 20px;font-size: 24px; display: block;">${code}</p>
                        </div>
                    </div>
                </main>    
            `;
            const to = email;
            await transport.sendMail({
                from:"E-commerce de Emilano <gorgellonemiliano@gmail.com>",
                to,
                subject,
                html
            });
            return `Se envio email al usuario ${email} para reestablecer su contraseña`;
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
}

    module.exports = new Nodemailer();