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
                    return res.status(505).send("ERROR")
                else{
                    
                    let x= await usermodel.create({name,email,password:hash})
                    let token=generate(x)
                    res.cookie("token",token)
                    return res.redirect('/shop')
                }
            });
        }
        else{
            req.flash('error', 'Already Exist');
            return res.redirect('/');
        }
});
}
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usermodel.findOne({ email });
        
        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash('error', 'Incorrect password');
            return res.redirect('/');
        }

        const token = generate(user);
        
        // Set cookie with proper options
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure in production
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            sameSite: 'lax'
        });

        return res.redirect('/shop');
    } catch (error) {
        console.error('Login error:', error);
        req.flash('error', 'An error occurred during login');
        return res.redirect('/');
    }
}
module.exports.logout= (req,res)=>{
    
    res.cookie("token",'')
    res.redirect('/')
}