const express=require('express')
const { islogin } = require('../middlewares/islogin')

const router=express.Router()

router.get("/",(req,res)=>{
    let error=req.flash("error")
    res.render("index",{error})
})
router.get('/shop',islogin,(req,res)=>{
    res.render("shop",{products:[]})
})


module.exports = router