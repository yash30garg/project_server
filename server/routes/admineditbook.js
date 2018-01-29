const express = require('express');
const bodyParser = require('body-parser')
const  app = express();
var AddBooks = require('../../model/AddBookDetails');
var router=express.Router();
var cors = require('cors');
router.use(cors());

router.post("/findBook",(req,res)=>{
    AddBooks.find({"isbn":req.body.isbn})
    .then((book)=>{
        if(book.length>0){
            res.json(book)
            }
            else{
                console.log("book not Found")
                res.json("Book Doesn't Exist, Add It !!!")
            }
        // res.json(user);
    })
    .catch((err)=>{
        res.json(error)
    })  
})

module.exports = router;