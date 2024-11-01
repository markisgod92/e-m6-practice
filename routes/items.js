const express = require('express')
const ItemsModel = require('../models/ItemsModel')
const items = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {verifyToken, checkOwner} = require('../middlewares/verifyToken')

items.get('/all', async (req, res, next) => {
    try {
        const items = await ItemsModel.find()

        if(items.length === 0) {
            const error = new Error('No items found.')
            error.status = 404
            return next(error)
        }

        res.status(200)
            .send({
                statusCode: 200,
                message: 'Items found.',
                items
            })
    } catch (error) {
        next(error)
    }
})

module.exports = items