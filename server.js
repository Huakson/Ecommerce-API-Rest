const compression = require("compression");
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const { ValidationError } = require('express-validation')


// Start 
const app = express();

// AMBIENTE 
const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 3000;

// Arquivos estaticos
app.use("/public", express.static(__dirname + "/public"));
app.use("/public/images", express.static(__dirname + "/public/images"));

// SETUP MONGODB
mongoose.set('useCreateIndex', true);
const dbs = require("./config/database");
const dbURI = isProduction ? dbs.dbProduction : dbs.dbTest;
mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true });

// Setup ejs  
app.set("view engine", "ejs");

// CONFIGURACOES
if (!isProduction) app.use(morgan("dev"));
app.use(cors());
app.disable('x-powered-by');
app.use(compression());

//SETUP Validation-error 
app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }
    return res.status(500).json(err)
})

// SETUP body parser
app.use(bodyParser.urlencoded({ extended: false, limit: 1.5 * 1024 * 1024 }));
app.use(bodyParser.json({ limit: 1.5 * 1024 * 1024 }));

// MODELS
require("./models");

// ROTAS
app.use("/", require("./routes"));

// 404 -ROTA
app.use((req, res, nex) => {
    const err = new Error("NOT FOUND");
    err.status = 404;
    nex(err);
});

// ROTA - 422 500, 401
app.use((err, req, res, nex) => {
    res.status(err.status || 500);
    if (err.status !== 404) console.log("ERROR: ", err.message, new Date());
    res.json(err);
});

// ESCUTA
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`RODANDO NA //localhost:${PORT}`);
});

