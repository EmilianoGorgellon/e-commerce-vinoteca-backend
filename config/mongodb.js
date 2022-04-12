const mongoose = require("mongoose");
const {config} = require("./index");

let connection;
(async () => {
    try {
        connection = mongoose.connect(config.mongo_atlas_uri, {useNewUrlParser:true, useUnifiedTopology: true})
        console.log("DB is connected");
    } catch (error) {
        console.log(error)
    }
})()

module.exports = {connection};