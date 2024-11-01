const jwt = require('jsonwebtoken')
const ItemsModel = require('../models/ItemsModel')

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

const checkUserDataOwner = (req, res, next) => {
    const token = req.header('Authorization')
    const { userId } = req.params

    try {
        const userData = jwt.decode(token)

        if(userData.id !== userId) {
            const error = new Error('Unauthorized')
            error.status = 401
            return next(error)
        }

        next()
    } catch (error) {
        next(error)
    }  
}

const checkItemOwner = async (req, res, next) => {
    const token = req.header('Authorization')
    const { itemId } = req.params

    try {
        const userData = jwt.decode(token)
        const item = await ItemsModel.findById(itemId)
        const ownerId = item.user._id.toString()

        if(!item) {
            const error = new Error('No items found.')
            error.status = 404
            return next(error)
        }

        if(userData.id !== ownerId) {
            const error = new Error('Unauthorized.')
            error.status = 401
            return next(error)
        }

        next()
    } catch (error) {
        next()
    }
}

module.exports = { verifyToken, checkUserDataOwner, checkItemOwner}