const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    _id: {
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
    content:{
        type: String,
        required: true,
    },
    createdAt: {
        type:Date,
        default: Date.now,
    }
})

module.exports = MessageSchema;
//module.exports = mongoose.models.Message || mongoose.model('Message', MessageSchema)