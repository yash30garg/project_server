const express = require('express');
const bodyParser = require('body-parser')
const  app = express();
var UserTest = require('../../model/userTest');
var router=express.Router();
var cors = require('cors');
router.use(cors());


let response = {
    status: 200,
    data: [],
    message: null
};

router.put("/addBook", (req, res) => {
    // console.log(req.body)
    UserTest.findOneAndUpdate({mid:req.body.mid},{$push:{borrowedBooks:req.body.item}})
    // UserTest.find({mid:"1042748"})
// UserTest.findOneAndUpdate({ mid: req.body.mid }, {$push:{booksArray:req.body.item}}, function(err, user) {})
.then((user)=>{
    console.log("added")
    res.json(user); 
})
.catch((error)=>{
    console.log("error")
res.json(error)
})
});

router.post("/getBooks", function (req, res, next){
    // console.log(req.body)'
    UserTest.findOne({"mid":req.body.mid})
    // UserTest.find({mid:"1042748"})
// UserTest.findOneAndUpdate({ mid: req.body.mid }, {$push:{booksArray:req.body.item}}, function(err, user) {})
.then((user)=>{
    // console.log(user)
    response.data=user.borrowedBooks;
    // console.log("found")
    // console.log(response.data)
    // user.borrowedBooks.map((book)=>{
    //     UserTest.findOne({books})
    //     console.log(book.isbn)
    // })
    res.json(response)
})
.catch((error)=>{
    console.log("error")
res.json(error)
})
});


router.put("/deleteBook", (req, res) => {
    // console.log(req.body)
    // UserTest.findOneAndUpdate({mid:req.body.mid},{$pull:{booksArray:{details:{title:"New Book"}}}},{ multi: true })
    UserTest.update({mid:req.body.mid},{$pull:{borrowedBooks:{isbn:req.body.isbn}}})
    .then((user)=>{
    console.log("removed")
    res.json(user); 
    })
    .catch((error)=>{
    console.log("error")
    });
});
    module.exports = router;