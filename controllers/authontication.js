const express=require('express')
const usermodel=require("../models/usermodel")
const {generate}=require('../utils/generatetoken')
const bcrypt=require('bcrypt')
module.exports.authontication=async (req,res)=>{

    let {name,email,password}=req.body;
    let user=await usermodel.findOne({email})
    bcrypt.genSalt(10, function(err, salt) {
        if (!user){

            bcrypt.hash(password, salt, async function(err, hash) {
                if(err)
                    res.status(505).send("ERROR")
                else{
                    
                    let x= await usermodel.create({name,email,password:hash})
                    let token=generate(x)
                    res.cookie("token",token)
                    res.send(x)
                }
            });
        }
        else{
            res.status(505).send("Exist")
        }
});
}
module.exports. login=async (req,res)=>{
    let {email,password}=req.body;
    let user=await usermodel.findOne({email})
    if(!user)
        res.status(404).send("Email Not found")
    else{
        bcrypt.compare(password,user.password,(err,result)=>{
            if(err){
                res.send("Error in comparring")
            }
            else{
                if(result){
                    let token=generate(user)
                    res.cookie("token",token)
                    res.render('shop',{products:[]})
                }
                else{
                    res.send("Incorrect Password")
                }
            }
        })
    }
}