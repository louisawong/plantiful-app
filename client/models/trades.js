const mongoose = require('mongoose');
const Comment = require('./comments')

const TradeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        default: "",
    },
    updated:{
        type: Date,
        default: Date.now,
    },
    images:{
        type: [String],
        required:true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    removed: {
        type: Boolean,
        default: false,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        }
    },
    minOffer: {
        type: Number,
        default: 0,
    },
    trade: {
        type: Boolean,
        default: true,
    },
    sell: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.models.Trade || mongoose.model('Trade', TradeSchema)