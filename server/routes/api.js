const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var User = require('../../models/user')
var users, books, db, resp;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://mongosql.westus2.cloudapp.azure.com', (err, db) => {
        db = client.db('lims')
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

        var db = client.db('lims')
        db.collection('UsersInfo')
            .find()
            .toArray()
            .then((UsersInfo) => {
                response.data = UsersInfo;
                res.json(response.data[0].Users);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.get('/Books', (req, res) => {
    MongoClient.connect('mongodb://mongosql.westus2.cloudapp.azure.com', (err, client) => {
        // MongoClient.connect('mongodb://localhost:27017', (err, client) => {

        var db = client.db('lims')
        db.collection('Books')
            .find()
            .toArray()
            .then((Books) => {
                response.data = Books;
                res.json(response.data[0]);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});



router.post('/', function (req, res, next) {

    if (req.body.logemail && req.body.logpassword) {
        // console.log(req.body.logemail,req.body.logpassword)
        MongoClient.connect('mongodb://mongosql.westus2.cloudapp.azure.com', (err, client) => {
            // MongoClient.connect('mongodb://localhost:27017', (err, client) => {

            var db = client.db('lims')
            db.collection('UsersInfo')
                .find()
                .toArray()
                .then((UsersInfo) => {
                    response.data = UsersInfo;
                    // console.log("response",response.data[0].Users)
                    resp = response.data[0].Users.filter((user) =>
                    // console.log(user.user.email, user.user.password)
                        (user.user.email === req.body.logemail) && (user.user.password === req.body.logpassword))
                        console.log(resp.length,res)
                        if (resp.length >= 1) {
                            console.log("Success")
                        return res.redirect('http://limsreact.azurewebsites.net/#/home')
                        // return res.redirect('http://localhost:3001/#/home')
                        
                    }
                    else {
                        console.log("Failed")
                        var err = new Error('Enter Valid Email and Password');
                        err.status = 400;
                        return next(err);
                    }
                    // .filter((user)=> {
                    //         if(user.email===req.body.logemail&&user.password===req.body.logpassword)
                    //         {
                    //             return res.redirect('http://localhost:3001/home')
                    //         }
                    //     } )
                        // res.json(response.data[0].booksArray);
                    })
                    
                    // .catch((err) => {
                    //     sendError(err, res);
                    // });
                });
                 
            // User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
            //   if (error || !user) {
            //     var err = new Error('Wrong email or password.');
            //     err.status = 401;
            //     return next(err);
            //   } else {
            //     req.session.userId = user._id;
            //     return res.redirect('http://localhost:3001/home');
            //   }
            // });
        } else {
                var err = new Error('All fields required.');
                err.status = 400;
                return next(err);
            }
})


module.exports = router;