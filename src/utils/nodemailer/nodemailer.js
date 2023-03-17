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
    async new_user_verification (email, token){
        try {
            const subject = "Verificacion de Email";
            const html = 
                    `
                        <html>
                            <body>
                                <table style="width: 100%;">
                                    <tbody style="display: block; background-color: #0077F9; height:400px; width: 500px; border-radius: 10px;">
                                        <tr>
                                            <td style="padding-left: 150px; padding-top: 20px;"><img style="width: 150px; border-radius: 10px;" src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/wine-bar-logo-brand-logo-template-design-467de904bec2855b56d72d5f58c91407_screen.jpg?ts=1574430397" alt="logo vino"/></td>
                                        </tr>
                                        <tr style="margin: 50px; display: block; text-align: center; background-color: #ffffff; border-radius: 10px; font-size: 18px;">
                                            <td style="display: block;"><p>Haciendo click al siguiente link <a href="http://localhost:3000/newuser/${token}">podra confirmar el mail</a></p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </body>
                        </html>
                    `
            const to = email;
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

    async email_forget_password (email, codePW){
        try {
            const subject = "Recupero de contraseña";
            const html = 
                `
                    <html>
                        <body>
                            <table style="width: 100%;">
                                <tbody style="display: block; background-border: 1px solid black; height:420px; width: 500px; border-radius: 10px;">
                                    <tr>
                                        <td style="padding-left: 150px; padding-top: 20px;">
                                            <img style="width: 150px; border-radius: 10px;" src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/wine-bar-logo-brand-logo-template-design-467de904bec2855b56d72d5f58c91407_screen.jpg?ts=1574430397" alt="logo vino"/>
                                        </td>
                                    </tr>
                                    <tr style="margin: 50px; display: block; text-align: center; background-color: #ffffff; border-radius: 10px; font-size: 18px;">
                                        <td style="display: block; padding: 5px;"><p style="font-size: 24px; margin: 0;">Su codigo para reestablecer la contraseña es: </p></td>
                                        <td style="text-align: center; display: block;"><h1 style="margin: 0">${codePW}</h1></td>
                                    </tr>
                                </tbody>
                            </table>
                        </body>
                    </html>
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