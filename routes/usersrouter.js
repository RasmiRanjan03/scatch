const express=require('express')
const usermodel=require("../models/usermodel")
const {generate}=require('../utils/generatetoken')
const bcrypt=require('bcrypt')
const { authontication,login,logout } = require('../controllers/authontication')

const router=express.Router()

router.get("/",(req,res)=>{
    res.send("Hey This is User")
})

router.post("/register",authontication)

router.post("/login",login)

// Allow logout via GET for convenient link-based logout from header
router.get('/logout', logout)
router.post("/logout",logout)

module.exports=router;