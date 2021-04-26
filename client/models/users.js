const mongoose = require('mongoose');
const Inspo = require('./inspos');
const Trade = require('./trades');
const Chat = require('./chats');

const UserSchema = new mongoose.Schema({
    uid: {
        type:String,
        require: true,
    },
    username: {
        type: String,
        required: [true, 'Please enter a username.'],
        unique: [true, 'Username already taken.'],
        maxLength: [30, 'Username cannot be more than 30 characters.']
    },
    followers: {
        type: [String],
        default: []
    },
    numFollowers: {
        type: Number,
        default: 0,
    },
    profile: {
        type: String,
        default: "",
    },
    inspos: {
        type: [Inspo],
        default: [],
    },
    numInspos: {
        type: Number,
        default: 0,
    },
    trades: {
        type: [Trade],
        default: [],
    },
    numTrades: {
        type: Number,
        default: 0,
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
    country:String,
    chats: {
        type: [Chat],
        default: [],
    },
    email: {
        type: String,
        required: true,
    },
    updated:{
        type: Date,
        default: Date.now,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        default: "",
    },
    description:{
        type: String,
        default: "",
    },
    removed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type:Date,
        default: Date.now,
    }
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)