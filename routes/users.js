const express = require('express')
const UserModel = require('../models/UsersModel')
const users = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

users.get('/all', async (req, res, next) => {
    try {
        const users = await UserModel.find()

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

users.get('/user/:userId', async (req, res, next) => {
    const { userId } = req.params()

    try {
        const user = await UserModel.findById(userId)

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

module.exports = users