const { text } = require('express')
const mongoose=require('mongoose')



const productschema=mongoose.Schema({
    name:String,
    price:Number,
    discount:{type:Number,default:0},
    bgcolor:String,
    textcolor:String,
    panelcolor:String,
    image:Buffer})
module.exports=mongoose.model('product',productschema)