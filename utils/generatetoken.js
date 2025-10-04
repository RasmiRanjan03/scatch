const jwt=require('jsonwebtoken')
const generate=(user)=>{
    return jwt.sign({email:user.email,_id:user._id},process.env.JWT_KEYS)
}
module.exports.generate=generate