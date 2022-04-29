const cloudinary_config = require("../../config/cloudinary");

class Cloudinary {
    async generateImagen (image) {
        const result_cloudinary = await cloudinary_config.v2.uploader.upload(image);
        const imageUrl = result_cloudinary.secure_url;
        const public_id = result_cloudinary.public_id;
        return [imageUrl, public_id]
    }
}

module.exports = new Cloudinary();