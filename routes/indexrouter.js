const express=require('express')
const { islogin } = require('../middlewares/islogin')
const productmodel=require("../models/productmodel")
const router=express.Router()

router.get("/",(req,res)=>{
    let error=req.flash("error")
    res.render("index",{error})
})
router.get('/shop',islogin,async (req,res)=>{
    let products=await productmodel.find()
    res.render("shop",{products})
})


module.exports = router