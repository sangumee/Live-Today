const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userNUM: Number,
    userId: String,
    avatarURL: String,
    name: String,
    bio: String,
    email: String,
    phoneNumber: String,
    registerType: String,
    registerDate: {
        type: Date,
        default: Date.now()
    },
    viewCount: Number
});
module.exports = mongoose.model('User', userSchema);