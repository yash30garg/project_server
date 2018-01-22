const express = require('express');
const bodyParser = require('body-parser')
const  app = express();
var UserTest = require('../../model/userTest');
var router=express.Router();
var cors = require('cors');
router.use(cors());

router.put("/addBook",(req,res)=>{
  UserTest.findOneAndUpdate({mid:req.body.mid},{$push:{wishlist:req.body.book}})
  .then((user)=>{
      console.log("added");
      res.json(user);
  })  
  .catch((err)=>{
      console.log("Error occurred");
      res.json(err);
  })
});