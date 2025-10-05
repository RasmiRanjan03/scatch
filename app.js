const express=require('express');
const path=require('path');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const flash=require('connect-flash');
const cookieparser=require('cookie-parser');
const session=require('express-session');
require('dotenv').config();

const db=require('./config/mongoose-connection')
const ownersrouter=require('./routes/ownersrouter')
const usersrouter=require('./routes/usersrouter')
const productsrouter=require('./routes/productsrouter')
const indexrouter=require('./routes/indexrouter')
const app=express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieparser());
// Ensure we have a session secret. Use a dev fallback but warn if not set.
const sessionSecret = process.env.SESSION_SECRET || 'dev_secret_change_me'
if (!process.env.SESSION_SECRET) {
    console.warn('WARNING: SESSION_SECRET is not set. Using a development fallback secret. Do not use this in production.')
}

app.use(session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false
}))
app.use(flash());

app.use('/owner',ownersrouter)
app.use('/users',usersrouter)
app.use('/products',productsrouter)
app.use('/',indexrouter)

app.listen(3000);