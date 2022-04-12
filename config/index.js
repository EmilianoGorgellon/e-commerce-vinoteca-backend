require("dotenv").config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT,
    mongo_atlas_uri: process.env.MONGO_ATLAS_URI,
    cors: `${process.env.CORS}`,
    secret_jwt: `${process.env.SECRET_JWT}`,
    cloudinary_name: `${process.env.CLOUDINARY_NAME}`,
    cloudinary_api_key: `${process.env.CLOUDINARY_API_KEY}`,
    cloudinary_api_secret: `${process.env.CLOUDINARY_API_SECRET}`
}

module.exports = {config}