const jwt = require('jsonwebtoken')

// Use JWT_KEYS if set, otherwise fall back to a development secret and warn
const jwtSecret = process.env.JWT_KEYS || 'dev_jwt_secret_change_me'
if (!process.env.JWT_KEYS) {
    console.warn('WARNING: JWT_KEYS is not set. Using a development fallback secret. Do not use this in production.')
}

const generate = (user) => {
    return jwt.sign({ email: user.email, _id: user._id }, jwtSecret)
}

module.exports.generate = generate