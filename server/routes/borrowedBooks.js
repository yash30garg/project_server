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
    UserTest.findOneAndUpdate({mid:req.body.mid},{$push:{borrowedBooks:req.body.item}},{new:true})
    // UserTest.find({mid:"1042748"})
// UserTest.findOneAndUpdate({ mid: req.body.mid }, {$push:{booksArray:req.body.item}}, function(err, user) {})
.then((user)=>{
    console.log("added")
    response.data=user.borrowedBooks;
    response.message="Added to Borrowed Books"
    res.json(response); 
})
.catch((error)=>{
    console.log("error")
    response.status=400;
    response.message="Error"
res.json(response);
})
});

router.post("/getBooks", function (req, res, next){
    console.log(req.body.mid)
    UserTest.findOne({"mid":req.body.mid})
    .then((user)=>{
        response.data[0]=user.borrowedBooks;
        response.data[1]=user.wishlist;
    res.json(response)
    })
    .catch((error)=>{
    console.log("error")
    console.log(error)
    res.json(error)
    })
});



router.put("/deleteBook", (req, res) => {
    // console.log(req.body)
    // UserTest.findOneAndUpdate({mid:req.body.mid},{$pull:{booksArray:{details:{title:"New Book"}}}},{ multi: true })
    UserTest.findOneAndUpdate({mid:req.body.mid},{$pull:{borrowedBooks:{isbn:req.body.isbn}}},{new:true})
    .then((user)=>{
    console.log("removed")
    response.status=200;
    response.data=user.borrowedBooks;
    response.message="Successfully Removed"
    res.json(response); 
    })
    .catch((error)=>{
        response.status=400;
        response.message="Error"
    console.log("error")
    res.json(response);
    });
});
    module.exports = router;