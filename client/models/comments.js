const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
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

module.exports = mongoose.models.Comment || mongoose.model('Comment', CommentSchema)