const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    Address_1: {
        type: String,
        required: true
    },
    Address_2: {
        type: String
    },
    City: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    Zipcode: {
        type: Number,
        minlength: 5,
        maxlength: 9,
        required: true
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
