const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

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

module.exports = router;