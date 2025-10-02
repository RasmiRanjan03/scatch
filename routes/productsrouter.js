const express=require('express')
const router=express.Router()

router.get("/",(req,res)=>{
    res.send("Hey This is Product")
})

module.exports=router;