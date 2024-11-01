const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    storage: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        required: true,
        enum: ['new', 'like new', 'used', 'spare parts']
    },
    picture: {
        type: String,
        default: 'https://picsum.photos/200/300'
    },
    price: {
        type: String,
        required: true
    },
    isSold: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'usersModel'
    }
}, { timestamps: true, strict: true })

module.exports = mongoose.model('itemsModel', ItemSchema, 'items')