const nodemailer = require("nodemailer");
const { config } = require("../../config");
const user = config.nodemailer_user;
const pass = config.nodemailer_pw;
nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: true,
    auth: {
        user,
        pass
    }
});

class Nodemailer {
    async newUser (data){
        try {
            const subject = "Nuevo registro!";
            const html = 
                `
                    <h1>Informacion del usuario registrado</h1>
                    <ul>
                        <li>Nombre: ${data.name}</li>
                        <li>Email: ${data.email}</li>
                        <li>Edad: ${data.edad}</li>
                        <li>Telefono: ${data.phone}</li>
                        <img src="data:image/png;base64,${data.photo}" alt="perfil-img-user" />
                    </ul>
                `; 
            const to = process.argv[4] || user;
            return await transport.sendMail({
                from:"E-commerce de Emilano <ecommerceEmiliano@gmail.com>",
                to,
                subject,
                html
            });
        } catch (error) {
            throw new Error("Error en enviar email");
        }
    }
}
