const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    username: {
        type:String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
})

module.exports = mongoose.models.Message || mongoose.model('Message', MessageSchema)