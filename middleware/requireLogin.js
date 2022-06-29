//middleware function

const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (req, res,next) =>{
const {authorization} = req.headers
//authorization === Bearer {token which we will assign the user}
if(!authorization){
    return res.status(401).json({error:"you must be logged in"})                 //401 unauthorized
}
const token = authorization.replace("Bearer ","")
jwt.verify(token,JWT_SECRET,(err,payload)=>{
    if(err){
       return res.status(401).json({error:"you must be logged in"})
    }
    const {_id} = payload

    User.findById(_id).then(userdata=>{
        req.user = userdata    //user data is available in req.user
        next()            //next is used inside because querying data might take a while hence it needs to be called after querying 
    })
   //to stop middleware and continue code further
})
}