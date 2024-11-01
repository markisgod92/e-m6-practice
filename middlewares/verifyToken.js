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

const checkOwner = (req, res, next) => {
    const token = req.header('Authorization')
    const { userId } = req.params

    try {
        const userData = jwt.decode(token)

        if(userData.id !== userId) {
            const error = new Error('Unhautorized')
            error.status = 401
            return next(error)
        }

        next()
    } catch (error) {
        next(error)
    }  
}

module.exports = { verifyToken, checkOwner}