const express = require('express');
const bodyParser = require('body-parser')
const  app = express();
const passport = require('passport');
const jwt = require('jsonwebtoken');
var UserTest = require('../../model/userTest');
var router=express.Router();
var cors = require('cors');
router.use(cors());

router.get("/getUsers",(req,res)=>{
    UserTest.find({})
    .then((users)=>{
        res.json(users)
    })
    .catch(err=>{
        res.json(err)
    })
})

router.post("/findUser",(req,res)=>{
    UserTest.find({email:req.body.email})
    .then((user)=>{
        if(user.length===1)
        res.json(user)
        else
        res.json('No User Present')
    })
    .catch(err=>{
        res.json(err)
    })
})

router.put("/editRole",(req,res)=>{
    UserTest.findOneAndUpdate({email:req.body.email},{role:req.body.role})
    .then((user)=> {
        res.json("Done")
    }).catch((error)=> {
        res.json("Error")
    })
})


router.post("/addUser",(req,res)=>{
    UserTest.find({"mid":req.body.mid})
    .then((user)=>{
        if(user.length===0){
            UserTest.create({"mid":req.body.mid,"name":req.body.name,"email":req.body.email,"role":req.body.role,"borrowedBooks":req.body.borrowedBooks,"wishlist":req.body.wishlist})
            .then((user)=>{
                const token = jwt.sign({
                    data: user
                }, 'secret', {expiresIn:600000}
                )
                res.json({
                    success: true,
                    token: `Bearer ${token}`,
                    user,
                    status: "Exists"
                })
            })
            .catch((error)=>{
                res.json(error)
            }) 
            }
            else{
                // res.json("Exists")
                 const token = jwt.sign({
                    data: user
                }, 'secret', {expiresIn:600000}
                )
                res.json({
                    success: true,
                    token: `Bearer ${token}`,
                    user,
                    status:"Exists"
                })
            }
        // res.json(user);
    })
    .catch((err)=>{
        res.json(error)
    })  
})

module.exports = router;