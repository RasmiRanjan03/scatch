const express=require('express')
const router=express.Router()

router.get("/",(req,res)=>{
    res.send("Hey This is owner")
})

module.exports=router;