const express = require('express');
const bodyParser = require('body-parser')
const  app = express();
var UserTest = require('../../model/userTest');
var Reviews = require('../../model/reviews');
var Books = require('../../model/bookList')
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
.then((user)=>{
    // response.data=[];
    console.log("added")
    // var allBooks=[];
    response.data=user.borrowedBooks;
    // user.borrowedBooks.map((eachBook)=>{
    //     console.log("in")
    //     Books.findOne({isbn:eachBook.isbn})
    //     .then((book)=>{
    //         // console.log(book);
    //         allBooks.push(book);
    //     })
    // })
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

router.put("/renew",(req,res)=>{
    UserTest.findOneAndUpdate({mid:req.body.mid},{$pull:{borrowedBooks:{isbn:req.body.isbn}}},{new:true}) 
    .then((user)=>{
        UserTest.findOneAndUpdate({mid:req.body.mid},{$push:{borrowedBooks:req.body.item}},{new:true})
        .then((user)=>{
        console.log("updated")
        res.json(user);
        })
        .catch((err)=>{
            console.log("update error")
            res.json(err)
        })
    })
    .catch((err)=>{
        console.log("find err");
        res.json(err)
    })
})

router.put("/add",(req,res)=>{
    Reviews.findOne({isbn:req.body.isbn})
    .then((book)=>{
        if(book==null){
            Reviews.create({isbn:req.body.isbn,reviews:req.body.item})
            .then((book)=>{
                console.log("created")
                res.json(book)
            })
            .catch((err)=>{
                res.json(err)
            })
        }
        else{
            Reviews.findOneAndUpdate({isbn:req.body.isbn},{$push:{reviews:req.body.item}},{new:true})
            .then((newbook)=>{
                console.log("updated")
                res.json(newbook)
            })
            .catch((err)=>{
                res.json(err)
            })
        }
    })
    .catch((err)=>{
        res.json(err)
    })
})
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