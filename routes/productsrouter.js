const express=require('express')
const router=express.Router()
const upload=require('../controllers/multer-config')
const productmodel=require('../models/productmodel')
router.get("/",(req,res)=>{
    res.send("Hey This is Product")
})

router.post('/create',upload.single("image"),async(req,res)=>{
   try { let {name,price,discount,bgcolor,textcolor,panelcolor}=req.body;
    let image=req.file.buffer;
    let x=await productmodel.create({name,price,discount,bgcolor,textcolor,panelcolor,image})
    req.flash("Success","Created Successfully")
    res.render('createproducts',{success:["Created Successfully"]})}
    catch(err){
        res.status(505).send("ERROR")
    }

})

module.exports=router;