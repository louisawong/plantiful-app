const mongoose = require('mongoose');

const InspoSchema = new mongoose.Schema({
    userId: {
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
})

module.exports = mongoose.models.Inspo || mongoose.model('Inspo', InspoSchema)