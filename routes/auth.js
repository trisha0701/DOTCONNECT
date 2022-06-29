const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') //to generate a unique token when a user signs in
const {JWT_SECRET} = require('../config/keys')
const requireLogin = require('../middleware/requireLogin')


//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

// the below one is for sign up
router.post('/signup',(req,res)=>{
  const {name,email,password,pic} = req.body
  if(!email || !password || !name){
     return res.status(422).json({error:"please fill all the required fields"}) //server understands the requests but cannot process it
  }
  User.findOne({email:email}).then((savedUser)=>{
      if(savedUser){
        return res.status(422).json({error:"user already exists with that email"})
      }
      bcrypt.hash(password,12)  //default is 10.
      .then(hashedpassword=>{
      const user = new User ({
        email,
        password:hashedpassword, //we are using bcrypt to hash the password, greater the number stronger the password
        name,
        pic
    })
    user.save()
    .then(user=>{
        res.json({message:"saved successfully"})
    }).catch(err=>{
        console.log(err)
    })
      })
  }).catch(err => {
      console.log(err)
  })
    //finding the user in the database
})  //posting data


//the below one is for signing in
router.post('/signin',(req,res)=>{
    const {email, password} = req.body
     if(!email || !password ){
         return res.status(422).json({error:"please add email or password"})
     }
     User.findOne({email:email})
     .then(savedUser=>{
         if(!savedUser){
            return res.status(422).json({error:"Invalid Email or password"})
         }
         bcrypt.compare(password,savedUser.password)
         .then(doMatch=>{ // if password entered matches with the password saved in the database
             if(doMatch){
                //  res.json({message:"successfully signed in"})
              const token = jwt.sign({_id:savedUser._id},JWT_SECRET) //generate token when user sign in successfully  and storing it in _id
              const {_id,name,email,followers,following,pic}=savedUser
              res.json({token,user:{_id,name,email,followers,following,pic}}) //token:token can be written as token
            }
             else{
                return res.status(422).json({error:"Invalid Email or password"}) 
             }
         })
         .catch(err=>{
             console.log(err)         //error which is from the developer side not the user so no messages
        
         })
     })
})

module.exports = router