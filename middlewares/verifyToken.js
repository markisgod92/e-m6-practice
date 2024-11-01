const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')

    if(!token) {
        const error = new Error('Forbidden')
            error.status = 403
            return next(error)
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = verifyToken