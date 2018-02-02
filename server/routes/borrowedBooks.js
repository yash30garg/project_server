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
    UserTest.findOneAndUpdate({mid:req.body.mid},{$push:{borrowedBooks:req.body.item}},{new:true})
.then((user)=>{
    response.data=user.borrowedBooks;
    response.message="Added to Borrowed Books"
    res.json(response); 
})
.catch((error)=>{
    response.status=400;
    response.message="Error"
res.json(response);
})
});

router.post("/getReviews",(req,res)=>{
    Reviews.find({isbn:req.body.isbn})
    .then((data)=>{
        console.log(data[0].reviews);
        res.json(data);
    })
    .catch((err)=>{
        res.json(err)
    })
})
router.post("/getBooks", function (req, res, next){
    UserTest.findOne({"mid":req.body.mid})
    .then((user)=>{
        response.data[0]=user.borrowedBooks;
        response.data[1]=user.wishlist;
    res.json(response)
    })
    .catch((error)=>{
    res.json(error)
    })
});

// router.put("/renew", (req, res) => {
//     UserTest.findOneAndUpdate({mid:req.body.mid},{$pull:{borrowedBooks:{isbn:req.body.isbn}}},{new:true})
//     .then((user)=>{
//     response.status=200;
//     response.data=user.borrowedBooks;
//     response.message="Successfully Removed"
//     res.json(response); 
//     })
//     .catch((error)=>{
//         response.status=400;
//         response.message="Error"
//     res.json(response);
//     });
// });

router.put("/add",(req,res)=>{
    Reviews.findOne({isbn:req.body.isbn})
    .then((book)=>{
        if(book==null){
            Reviews.create({isbn:req.body.isbn,reviews:req.body.item})
            .then((book)=>{
                res.json(book.reviews)
            })
            .catch((err)=>{
                res.json(err)
            })
        }
        else{
            Reviews.findOneAndUpdate({isbn:req.body.isbn},{$push:{reviews:req.body.item}},{new:true})
            .then((newbook)=>{
                res.json(newbook.reviews)
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

router.put("/renewDate", (req, res) => {
    UserTest.findOneAndUpdate({mid:req.body.mid},{$pull:{borrowedBooks:{isbn:req.body.isbn}}},{new:true})
    .then((user)=>{
     UserTest.findOneAndUpdate({mid:req.body.mid},{$push:{borrowedBooks:req.body.item}},{new:true})
     .then((user)=>{
         res.json(user.borrowedBooks);
     })
    .catch((err)=>{
        res.json(err)
    })
    })
    .catch((error)=>{
        response.status=400;
        response.message="Error"
    res.json(response);
    });
});

router.put("/deleteBook", (req, res) => {
    // UserTest.findOneAndUpdate({mid:req.body.mid},{$pull:{booksArray:{details:{title:"New Book"}}}},{ multi: true })
    UserTest.findOneAndUpdate({mid:req.body.mid},{$pull:{borrowedBooks:{isbn:req.body.isbn}}},{new:true})
    .then((user)=>{
    response.status=200;
    response.data=user.borrowedBooks;
    response.message="Successfully Removed"
    res.json(response); 
    })
    .catch((error)=>{
        response.status=400;
        response.message="Error"
    res.json(response);
    });
});
    module.exports = router;