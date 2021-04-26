const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
    tradeId: {
        type: String,
        required: true,
    },
    uid: {
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
    city: String,
    country: String,
    minOffer: {
        type: Number,
        default: 0,
    },
    tradePreference: String,
    trade: {
        type: Boolean,
        default: true,
    },
    sell: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = TradeSchema;
//module.exports = mongoose.models.Trade || mongoose.model('Trade', TradeSchema)