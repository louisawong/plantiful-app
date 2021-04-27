const mongoose = require('mongoose');
const Comment = require('./comments')

const InspoSchema = new mongoose.Schema({
    inspoId: {
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
    comments: {
        type: [Comment],
        default: [],
    },
    createdAt: {
        type:Date,
        default:Date.now,
    }
})

module.exports = InspoSchema;
//module.exports = mongoose.models.Inspo || mongoose.model('Inspo', InspoSchema)