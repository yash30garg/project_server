const express = require('express');
const bodyParser = require('body-parser')
const  app = express();
var UserTest = require('../../model/userTest');
var router=express.Router();
var cors = require('cors');
router.use(cors());

router.post("/addUser",(req,res)=>{
    UserTest.find({"mid":req.body.mid})
    .then((user)=>{
        if(user.length===0){
            UserTest.create({"mid":req.body.mid,"name":req.body.name,"email":req.body.email,"role":req.body.role,"borrowedBooks":req.body.borrowedBooks,"wishlist":req.body.wishlist})
            .then((user)=>{
                console.log("created user");
                res.json(user)
            })
            .catch((error)=>{
                console.log("error");
                console.log(error)
                res.json(error)
            }) 
            }
            else{
                console.log("User Found")
                res.json(user)
            }
        // res.json(user);
    })
    .catch((err)=>{
        res.json(error)
    })  
})

module.exports = router;