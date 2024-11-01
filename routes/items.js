const express = require('express')
const ItemsModel = require('../models/ItemsModel')
const UsersModel = require('../models/UsersModel')
const items = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {verifyToken, checkItemOwner} = require('../middlewares/verifyToken')

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

items.get('/:itemId', async (req, res, next) => {
    const { itemId } = req.params

    try {
        const item = await ItemsModel.findById(itemId).populate('user')

        if(!item) {
            const error = new Error('No items found.')
            error.status = 404
            return next(error)
        }

        res.status(200)
            .send({
                statusCode: 200,
                message: `Item ${itemId} found.`,
                item
            })
    } catch (error) {
        next(error)
    }
})

items.get('/search', async (req, res, next) => {
    const query = req.query

    try {
        const items = await ItemsModel.find(query)

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

items.post('/create', verifyToken, async (req, res, next) => {
    const token = jwt.decode(req.header('Authorization'))
    const newItem = new ItemsModel({
        ...req.body,
        user: token.id
    })

    try {
        const item = await newItem.save()
        await UsersModel.findByIdAndUpdate(token.id, {
            $push: { items: item._id }
        })

        res.status(201)
            .send({
                statusCode: 201,
                message: 'Item created.',
                item
            })
    } catch (error) {
        next(error)
    }
})

items.put('/:itemId', verifyToken, checkItemOwner, async (req, res, next) => {
    const { itemId } = req.params
    const modifiedItem = req.body

    try {
        const item = await ItemsModel.findByIdAndUpdate(itemId, modifiedItem, { new: true })

        if(!item) {
            const error = new Error('No items found.')
            error.status = 404
            return next(error)
        }

        res.status(200)
            .send({
                statusCode: 200,
                message: `Item ${itemId} updated successfully.`,
                item
            })
    } catch (error) {
        next(error)
    }
})

items.delete('/:itemId', verifyToken, checkItemOwner, async (req, res, next) => {
    const { itemId } = req.params

    try {
        const response = await ItemsModel.findByIdAndDelete(itemId)
        await UsersModel.findByIdAndUpdate(
            response.user._id.toString(), 
            { $pull: { items: response._id } }
        )
        
        if(!response) {
            const error = new Error('No items found.')
            error.status = 404
            return next(error)
        }

        res.status(200)
            .send({
                statusCode: 200,
                message: `Item ${itemId} deleted successfully.`,
            })
    } catch (error) {
        next(error)
    }
})

module.exports = items