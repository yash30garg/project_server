const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const  app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var User = require('../../model/user')
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

app.use(bodyParser.json());
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
    // MongoClient.connect('mongodb://mongosql.westus2.cloudapp.azure.com', (err, client) => {
        MongoClient.connect('mongodb://localhost:27017', (err, client) => {

        var db = client.db('limsr')
        db.collection('users')
            .find()
            .toArray()
            .then((UsersInfo) => {
                response.data = UsersInfo;
                res.json(response.data);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.get('/Books', (req, res) => {
    // MongoClient.connect('mongodb://mongosql.westus2.cloudapp.azure.com', (err, client) => {
        MongoClient.connect('mongodb://localhost:27017', (err, client) => {

        var db = client.db('limsr')
        db.collection('books')
            .find()
            .toArray()
            .then((Books) => {
                response.data = Books;
                res.json(response.data);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});



router.post('/', function (req, res, next) {

    if (req.body.email && req.body.password) {
        // console.log(req.body.logemail,req.body.logpassword)
        // MongoClient.connect('mongodb://mongosql.westus2.cloudapp.azure.com', (err, client) => {
            // router.get('/login',(req,res)=> {
            MongoClient.connect('mongodb://localhost:27017', (err, client) => {
                var db = client.db('limsr')
                db.collection('users')
                .find({"email" : req.body.email,"password" : req.body.password})
                .toArray()
                .then((aa) => {
                    if(aa!="") {
                    console.log(aa)
                    response.data = aa;
                    response.status = 200;
                    response.message = "success"
                    console.log(response)
                    res.json(response)
                    // res.redirect('http://localhost:3001/#/home')
                }
                else {
                    // console.log("Failed")
                    //     var err = new Error('Enter Valid Email and Password');
                    //     err.status = 400;
                    //     return next(err);
                    response.status = 400;
                    response.message = "Enter Valid Email and Password";
                    res.json(response);
                }
                })
                
                // .then((result) => {
                    // if(results!=="")
                    // {
                    //     // res.json(result);
                    //     res.redirect('http://localhost:3001/#/home');
                    // }
                    // else
                    // {
                    //     console.log("failed")
                    // }
                // })
            // var db = client.db('limsr')
            // db.collection('users')
            //     .find()
            //     .toArray()
            //     .then((UsersInfo) => {
            //         console.log(UsersInfo)
            //         response.data = UsersInfo;
            //         console.log("response",response.data)
            //         resp = response.data.filter((user) =>
            //         // console.log(user.user.email, user.user.password)
            //             (user.email === req.body.logemail) && (user.password === req.body.logpassword))
            //             // console.log(resp.length,res)
            //             if (resp.length >= 1) {
            //                 console.log("Success")
            //             // return res.redirect('http://limsreact.azurewebsites.net/#/home')
            //             return res.redirect('http://localhost:3001/#/home')
                        
            //         }
            //         else {
            //             console.log("Failed")
            //             var err = new Error('Enter Valid Email and Password');
            //             err.status = 400;
            //             return next(err);
            //         }
            //         })
                    
                    // .catch((err) => {
                    //     sendError(err, res);
                    // });
                });
            // });
                 
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
                // var err = new Error('All fields required.');
                // err.status = 400;
                // return next(err);
                response.status = 400;
                response.message = "All fields required";
                res.json(response);
            }
})


module.exports = router;