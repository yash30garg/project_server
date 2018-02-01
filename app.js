const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const passport = require('passport')
const path = require('path');
const http = require('http');
const app = express();
// var cors = require('cors');
// app.use(cors)
// const Admin = require('./Models/admin_login_Model');
// const User = require('./Models/user_Model')



// API file for interacting with MongoDB
const api = require('./server/routes/api');
// var mongoDB = 'mongodb://localhost:27017/limsTest';
var mongoDB = 'mongodb://mongosql.westus2.cloudapp.azure.com/lims';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const borrowedBooks=require('./server/routes/borrowedBooks');
const user=require('./server/routes/user');
const wishlist=require('./server/routes/wishlist');
const books=require('./server/routes/books');
// const addRev=require('./server/routes/reviews');
const adminaddbook=require('./server/routes/adminaddbook');
const admineditbook=require('./server/routes/admineditbook');
const admindeletebook=require('./server/routes/admindeletebook');

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/limsr');
// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: PUT, POST, PATCH, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// API location
app.use('/api', api);
app.use('/borrowedBooks', borrowedBooks);
app.use('/user', user);
app.use('/wishlist',wishlist);
app.use('/books',books)
app.use('/addbook',adminaddbook)
app.use('/admineditbook',admineditbook)
app.use('/admindeletebook',admindeletebook)
// app.use('/addReview',addRev)
// //importing route
// var routes = require('./Routes/admin_login_Routes'); //importing route
// routes(app); //register the route


//Passport
app.use(passport.initialize());
app.use(passport.session());
//Import Passport Config
require('./passport/config')(passport);

//Set Port
const port = process.env.PORT || '3005';
app.set('port', port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));