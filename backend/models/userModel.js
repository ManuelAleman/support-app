const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true
    },
    phone: {
        type: Number,
        required: [true, 'Please provide your phone number'],
    },
    profilePicture: {
        type: String,
        default:
          "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png",
      },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'supporter', 'inCharge'],
        default: 'user'
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },

}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;