const bcrypt = require("bcryptjs");
const { config } = require("../../config");
class bcrypter {
    async comparePassword(password, password_db) {
        console.log("llego");
        return await bcrypt.compare(password, password_db);
    }

    async encryptPassword(password) {
        try {
            return await bcrypt.hash(password, config.salt_rounds_bcrypt);
        } catch (error) {
            throw new Error (`Error en la encriptacion de contraseña: ${error}`);
        }
    }
}
module.exports = new bcrypter();