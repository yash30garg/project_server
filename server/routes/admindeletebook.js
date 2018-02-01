const express = require('express');
const bodyParser = require('body-parser')
const  app = express();
var AddBooks = require('../../model/AddBookDetails');
var router=express.Router();
var cors = require('cors');
router.use(cors());

router.put("/removeBook",(req,res)=>{
  AddBooks.deleteOne({"isbn":req.body.isbn})

  .then((book)=>{
      res.json("Book Deleted");
  })
  
  .catch((err)=>{
      res.json(err);
  })
});
module.exports = router