const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    user: {
        // reference to user/client
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    gallons: {
        type: Number,
        required: true
    },
    delivery_add: {
        // comes from user profile (address 1 or 2?)
        type: String,
        required: true
    },
    delivery_date: {
        type: Date,
        required: true
    },
    price: {
        type: Number
    },
    total: {
        type: Number
    }
});

module.exports = Quote = mongoose.model('quote', QuoteSchema);
