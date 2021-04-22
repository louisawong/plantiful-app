const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
})

module.exports = mongoose.models.Message || mongoose.model('Message', MessageSchema)