const express=require('express')
const router=express.Router()

router.get("/",(req,res)=>{
    res.send("Hey This is User")
})

module.exports=router;