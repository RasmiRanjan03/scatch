const jwt=require('jsonwebtoken')
const usermodel=require("../models/usermodel")
module.exports.islogin=async (req,res,next)=>{
    if(!req.cookies.token){
        req.flash("error","Please Login First")
        res.redirect('/')
    }
    try{
        let decode=jwt.verify(req.cookies.token,process.env.JWT_SECRET)
        let user=await usermodel.findOne({email:decode.email}).select('-password')
        req.user=user
        next()
    }
    catch(err){
        req.flash("Some Error Occure")
        res.redirect('/')
    }
}