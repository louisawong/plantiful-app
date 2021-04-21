const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username.'],
        unique: true,
        maxLength: [30, 'Username cannot be more than 30 characters.']
    },
    password:{
        type: String,
        required: [true, 'Please enter a password.'],
    }
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)