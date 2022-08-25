const mongoose = require("mongoose");
const pino = require("../utils/pino/pino");
const {config} = require("./index");

let connection;
(async () => {
    try {
        connection = mongoose.connect(config.mongo_atlas_uri, {useNewUrlParser:true, useUnifiedTopology: true});
        pino.info("DB connected successfully");
    } catch (error) {
        pino.error("DB failed in the connection");
    }
})()

module.exports = {connection};