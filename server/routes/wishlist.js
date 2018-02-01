const express = require('express');
const bodyParser = require('body-parser')
const  app = express();
var UserTest = require('../../model/userTest');
var router=express.Router();
var cors = require('cors');
router.use(cors());

//Adding a book to wishlist
router.put("/addWBook",(req,res)=>{
  UserTest.findOneAndUpdate({mid:req.body.mid},{$push:{wishlist:req.body.book}},{new:true})
  .then((user)=>{
      res.json(user.wishlist);
  })  
  .catch((err)=>{
      res.json(err);
  })
});



//Removing a book from wishlist
router.put("/removeWishBook",(req,res)=>{
  UserTest.findOneAndUpdate({mid:req.body.mid},{$pull:{wishlist:{isbn:req.body.book}}},{new:true})
  .then((user)=>{
      res.json(user.wishlist);
  })
  .catch((err)=>{
      res.json(err);
  })
});

module.exports=router;
