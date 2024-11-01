const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const locations = require('../data/locations')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        unique: true
    },
    password: {
        type: String,
        min: 8,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true,
        enum: locations
    },
    avatar: {
        type: String,
        default: 'https://picsum.photos/200/300'
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    items: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'itemsModel'
        }
    ],
    reviews: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'reviewsModel'
        }
    ]
})

UserSchema.pre('save', async function(next) {
    const user = this
    if(!user.isModified('password')) return next()

    try {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

module.exports = mongoose.model('usersModel', UserSchema, 'users')