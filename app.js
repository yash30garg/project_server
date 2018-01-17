const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const app = express();
// const Admin = require('./Models/admin_login_Model');
// const User = require('./Models/user_Model')

// API file for interacting with MongoDB
const api = require('./server/routes/api');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/limsr');
// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// API location
app.use('/api', api);

// //importing route
// var routes = require('./Routes/admin_login_Routes'); //importing route
// routes(app); //register the route


//Set Port
const port = process.env.PORT || '3005';
app.set('port', port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));