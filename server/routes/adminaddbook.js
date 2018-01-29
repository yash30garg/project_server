const express = require('express');
const bodyParser = require('body-parser')
const  app = express();
var AddBooks = require('../../model/AddBookDetails');
var router=express.Router();
var cors = require('cors');
router.use(cors());

router.post("/addBook",(req,res)=>{
    AddBooks.find({"isbn":req.body.isbn})
    .then((book)=>{
        if(book.length===0){
            AddBooks.create({"isbn":req.body.isbn,"title":req.body.title,"author":req.body.author,"publisher":req.body.publisher,"category":req.body.category,"url":req.body.url,"rating":req.body.ratings,"year":req.body.year,"copies":req.body.copies})
            .then((book)=>{
                console.log("created book");
                console.log(book);
                res.json(book)
            })
            .catch((error)=>{
                console.log("error");
                console.log(error)
                res.json(error)
            }) 
            }
            else{
                console.log("book Found")
                res.json("Exists")
            }
        // res.json(user);
    })
    .catch((err)=>{
        res.json(error)
    })  
})

module.exports = router;