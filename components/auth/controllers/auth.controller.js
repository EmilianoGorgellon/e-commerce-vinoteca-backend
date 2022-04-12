const auth = require("../services/auth.services");
const signIn = async (req, res) => {
    const response = await auth.signInService(req.body);
    if (typeof(response) === "string") return res.status(200).json(response)
    return await res.status(401).json(response)
}

// // registrarse
const signUp = async (req, res) => {
    const data = {
        body: req.body,
        image: req.file
    }
    const response = await auth.signUpService(data);
    if (typeof(response) === "string") return res.status(200).json(response)
    return await res.status(401).json(response)
}

module.exports = { signIn, signUp };