const express = require('express')
const UsersModel = require('../models/UsersModel')
const users = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {verifyToken, checkOwner} = require('../middlewares/verifyToken')

users.get('/all', verifyToken, async (req, res, next) => {
    try {
        const users = await UsersModel.find()

        if(users.length === 0) {
            const error = new Error('No users found.')
            error.status = 404
            return next(error)
        }

        res.status(200)
            .send({
                statusCode: 200,
                message: 'Users found.',
                users
            })
    } catch (error) {
        next(error)
    }
})

users.get('/:userId', verifyToken, async (req, res, next) => {
    const { userId } = req.params

    try {
        const user = await UsersModel.findById(userId).populate('items reviews')

        if(!user) {
            const error = new Error('No users found.')
            error.status = 404
            return next(error)
        }

        res.status(200)
            .send({
                statusCode: 200,
                message: `User ${userId} found.`,
                user
            })
    } catch (error) {
        next(error)
    }
})

users.post('/create', async (req, res, next) => {
    const newUser = new UsersModel(req.body)

    try {
        const user = await newUser.save()

        res.status(201)
            .send({
                statusCode: 201,
                message: 'User registered.',
                user
            })
    } catch (error) {
        next(error)
    }
})

users.put('/:userId', verifyToken, checkOwner, async (req, res, next) => {
    const { userId } = req.params
    const modifiedUser = req.body

    try {
        const user = await UsersModel.findByIdAndUpdate(userId, modifiedUser, { new: true })

        if(!user) {
            const error = new Error('No users found.')
            error.status = 404
            return next(error)
        }

        res.status(200)
            .send({
                statusCode: 200,
                message: `User ${userId} updated successfully.`,
                user
            })
    } catch (error) {
        next(error)
    }
})

users.delete('/:userId', verifyToken, checkOwner, async (req, res, next) => {
    const { userId } = req.params

    try {
        const response = await UsersModel.findByIdAndDelete(userId)

        if(!response) {
            const error = new Error('No users found.')
            error.status = 404
            return next(error)
        }

        res.status(200)
            .send({
                statusCode: 200,
                message: `User ${userId} deleted successfully.`,
            })
    } catch (error) {
        next(error)
    }
})

module.exports = users