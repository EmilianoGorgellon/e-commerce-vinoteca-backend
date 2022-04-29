const bcrypt = require("bcryptjs");
const { config } = require("../../config");
class bcrypter {
    async comparePassword(password, password_db) {
        try {
            return await bcrypt.compare(password, password_db);
        } catch (error) {
            return `response: error en catch copmare password`
        }
    }

    async encryptPassword(password) {
        try {
            return await bcrypt.hash(password, config.salt_rounds_bcrypt);
        } catch (error) {
            return `response: Error`
        }
    }
}
module.exports = new bcrypter();