const mongoose=require('mongoose');



const userschema=mongoose.Schema({
    name:{type:String,minLength:5, default:"Admin",trim:true},
    email:String,
    password:String,
    isadmin:Boolean,
    profilepic:{type:String,default:"default.webp"},
    contact:Number,
    cart:[],
    address:String,
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'order'
    }]
});
module.exports=mongoose.model('user',userschema);
