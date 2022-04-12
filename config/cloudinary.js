const {config} = require("./index")
const cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: config.cloudinary_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret
});

module.exports = cloudinary;