const express = require('express')
const UsersModel = require('../models/UsersModel')
const login = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

login.post('/login', async (req, res, next) => {
    try {
        const user = await UsersModel.findOne({ username: req.body.username })
        if (!user) {
            const error = new Error('No users found.')
            error.status = 404
            return next(error)
        }

        const isPwValid = await bcrypt.compare(req.body.password, user.password)
        if (!isPwValid) {
            const error = new Error('Invalid password')
            error.status = 401
            return next(error)
        }

        const token = jwt.sign(
            {
                username: user.username,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        )

        res.header('Authorization', token)
            .status(200)
            .send({
                statusCode: 200,
                message: 'Successfully logged in.',
                authorization: token
            })
    } catch (error) {
        next(error)
    }

})

module.exports = login