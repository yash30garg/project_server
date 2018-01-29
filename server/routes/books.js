const express = require('express');
const bodyParser = require('body-parser')
const  app = express();
var Books = require('../../model/bookList');
var router=express.Router();
var cors = require('cors');
var passport = require('passport');
router.use(cors());

router.get("/getBooks",passport.authenticate('jwt',{session:false}),(req,res)=>
// router.get("/getBooks",(req,res)=>
{
    Books.find({}).then((books)=>

    {
        res.json(books);
    }).catch((error)=>{
    res.json(error);
       }   )

    
}
)

module.exports = router;