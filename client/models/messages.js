const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    userId: {
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