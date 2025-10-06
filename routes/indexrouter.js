const express=require('express')
const { islogin } = require('../middlewares/islogin')
const productmodel=require("../models/productmodel")
const usermodel=require("../models/usermodel")
const router=express.Router()

router.get("/",(req,res)=>{
    let error=req.flash("error")
    res.render("index",{error,loggedin:req.user?true:false })
})
router.get('/shop',islogin,async (req,res)=>{
    let products=await productmodel.find()
    let error=req.flash("error")
    res.render("shop",{products,error})
})

router.get('/addtocart/:id',islogin,async (req,res)=>{
    let id=req.params.id
    let user=await usermodel.findOne({email:req.user.email})
    user.cart.push(id)
    await user.save()
    let error=req.flash("error","Product added Succesfully")
    res.redirect('/shop')
})
router.get('/cart',islogin,async (req,res)=>{
    let user=await usermodel.findOne({email:req.user.email}).populate('cart')
    
    res.render("cart",{products:user.cart})})
module.exports = router