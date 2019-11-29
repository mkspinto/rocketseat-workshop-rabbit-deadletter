'use strict'

const bodyParser = require('body-parser');
var express = require("express");
var app = express();

//Routes
const indexRoute = require('./src/routes/route');

app.listen(9000, () => {
    console.log("[server] running on port 9000");
});

//Configurações Adicionais
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

//Configuração do CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//Register Routes
app.use('/', indexRoute);

module.exports = app;