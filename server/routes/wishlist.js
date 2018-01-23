const express = require('express');
const bodyParser = require('body-parser')
const  app = express();
var UserTest = require('../../model/userTest');
var router=express.Router();
var cors = require('cors');
router.use(cors());

//Adding a book to wishlist
router.put("/addWBook",(req,res)=>{
  UserTest.findOneAndUpdate({mid:req.body.mid},{$push:{wishlist:req.body.book}})
  .then((user)=>{
      console.log("added Book");
      res.json(user);
  })  
  .catch((err)=>{
      console.log("Error occurred");
      res.json(err);
  })
});


//Removing a book from wishlist
router.put("/removeWishBook",(req,res)=>{
  UserTest.update({mid:req.body.mid},{$pull:{wishlist:{isbn:req.body.isbn}}})
  .then((user)=>{
      console.log("book removed");
      res.json(user);
  })
  .catch((err)=>{
      console.log("Error occurred in removing");
      res.json(err);
  })
});

module.exports=router;
