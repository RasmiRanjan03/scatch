const jwt=require('jsonwebtoken')
const usermodel=require("../models/usermodel")
module.exports.islogin = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash('error', 'Please login first')
        return res.redirect('/')
    }

    try {
        const decode = jwt.verify(req.cookies.token, process.env.JWT_KEYS)
        const user = await usermodel.findOne({ email: decode.email }).select('-password')
        if (!user) {
            req.flash('error', 'User not found')
            return res.redirect('/')
        }
        req.user = user
        return next()
    } catch (err) {
        console.error('islogin error:', err)
        req.flash('error', 'Session invalid or expired, please login')
        return res.redirect('/')
    }
}