const cloudinary_config = require("../../config/cloudinary");
const fs = require("fs-extra");
class Cloudinary {
    async generateImagen (image) {
        try {
            const result_cloudinary = await cloudinary_config.v2.uploader.upload(image);
            await fs.unlink(image);
            const imageUrl = result_cloudinary.secure_url;
            const public_id = result_cloudinary.public_id;
            return [imageUrl, public_id];
        } catch (error) {
            throw new Error("No se creo imagen: ", error)
        }
    }

    async deleteImage (public_id) {
        try {
            await cloudinary_config.v2.uploader.destroy(public_id);
        } catch (error) {
            throw new Error("No se elimino la imagen: ", error)
        }
    }
}

module.exports = new Cloudinary();