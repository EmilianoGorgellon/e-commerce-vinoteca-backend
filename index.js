const express = require("express");
const app = express();
const {config} = require("./config");
const cors = require("cors");
const port = config.port;
const {connection} = require("./config/mongodb");
const multer = require("multer");
const path = require("path");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors(config.cors));
// config multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, "public/uploads"),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})  
app.use(multer({storage}).single('image'));

// Routes
app.use("/api/productos", require("./routes/productos"));
app.use("/api/auth", require("./routes/auth.routes"));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//  listen
app.listen(port, () => console.log("INICINADO EN PORT: " + port ))