const mongoose=require('mongoose');

const ownerschema=mongoose.Schema({
    name:{type:String,minLength:5, default:"Admin",trim:true},
    email:String,
    password:String,
    profilepic:{type:String,default:"default.webp"},
    product:{
        type:Array,
        default:[]
    },
    gst:String,
    contact:Number,
    address:String
});
module.exports=mongoose.model('owner',ownerschema);
