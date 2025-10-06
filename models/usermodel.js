const mongoose=require('mongoose');
const productmodel = require('./productmodel');



const userschema=mongoose.Schema({
    name:{type:String,minLength:5, default:"Admin",trim:true},
    email:String,
    password:String,
    isadmin:Boolean,
    profilepic:{type:String,default:"default.webp"},
    contact:Number,
    cart:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:productmodel
         }   ],
    address:String,
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:productmodel
    }]
});
module.exports=mongoose.model('user',userschema);
