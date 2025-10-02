const express=require('express');
const path=require('path');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const db=require('./config/mongoose-connection')
const ownersrouter=require('./routes/ownersrouter')
const usersrouter=require('./routes/usersrouter')
const productsrouter=require('./routes/productsrouter')
const app=express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.use('/owner',ownersrouter)
app.use('/user',usersrouter)
app.use('/product',productsrouter)
app.get('/',(req,res)=>{
    res.send("Hello");

})

app.listen(3000);