const express=require('express')
const router=express.Router()
const owner=require('../models/ownermodel')

router.get("/",(req,res)=>{
        res.send("Hey This is owner")
})
if(process.env.NODE_ENV==="development"){
        router.post('/create',async(req,res)=>{
                let {name,email,password}=req.body;
                let x=await owner.find()
                if (x.lenght >0)
                        res.status(505).send("ERROR")
                else{
                        let a=await owner.create({name,email,password})
                        res.send(a)
                }
        })
}

router.get('/admin',(req,res)=>{
        res.render('createproducts',{success:[]})
})

module.exports=router;