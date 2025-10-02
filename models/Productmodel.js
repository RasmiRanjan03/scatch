const { text } = require('express')
const mongoose=require('mongoose')



const productschema=mongoose.Schema({
    name:String,
    price:Number,
    discount:Number,
    bgcolor:String,
    textcolor:String,
    panelcolor:String,
    image:String})
module.exports=mongoose.model('product',productschema)