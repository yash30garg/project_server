const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var User = require('../../models/user')

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://mongosql.westus2.cloudapp.azure.com', (err, db) => {
    // return MongoClient.connect('mongodb://localhost:27017', (err, db) => {        
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

router.get("/", (req, res) => {
    res.send("Server is Running .!!. Have Fun Coding ...!!!");
});
// Get users
router.get('/UsersInfo', (req, res) => {
    MongoClient.connect('mongodb://mongosql.westus2.cloudapp.azure.com', (err, client) => {
    // MongoClient.connect('mongodb://localhost:27017', (err, client) => {
        
        var db=client.db('lims')
        db.collection('UsersInfo')
            .find()
            .toArray()
            .then((UsersInfo) => {
                response.data = UsersInfo;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.get('/Books', (req, res) => {
    MongoClient.connect('mongodb://mongosql.westus2.cloudapp.azure.com', (err, client) => {
    // MongoClient.connect('mongodb://localhost:27017', (err, client) => {
        
        var db=client.db('lims')
        db.collection('Books')
            .find()
            .toArray()
            .then((Books) => {
                response.data = Books;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});



router.post('/', function (req, res, next) {

  if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('http://localhost:3001/home');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})


module.exports = router;