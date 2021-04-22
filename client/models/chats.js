const mongoose = require('mongoose');
const Message = require('./messages')

const ChatSchema = new mongoose.Schema({
    user1Id: {
        type: String,
        required: true,
    },
    username1: {
        type: String,
        required:true,
    },
    user2Id:{
        type: String,
        required: true,
    },
    username2: {
        type: String,
        required:true,
    },
    messages:{
        type: [Message],
        default: [],
    },
    updated:{
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.models.Chat || mongoose.model('Chat', ChatSchema)