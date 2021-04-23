const mongoose = require('mongoose');
const Comment = require('./comments')

const InspoSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
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
    caption:{
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
    // location: {
    //     type: {
    //         type: String,
    //         enum: ['Point'],
    //     },
    //     coordinates: {
    //         type: [Number],
    //     }
    // },
    comments: {
        type: [Comment],
        default: [],
    },
})

module.exports = mongoose.models.Inspo || mongoose.model('Inspo', InspoSchema)