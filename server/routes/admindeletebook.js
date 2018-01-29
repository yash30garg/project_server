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
      console.log("book removed");
      console.log(book)
      res.json("Book Deleted");
  })
  
  .catch((err)=>{
      console.log("Error occurred in removing");
      res.json(err);
  })
});
module.exports = router