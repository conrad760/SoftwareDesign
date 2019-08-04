const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// models
const Quote = require('../../models/Quotes');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   POST api/quote
// @desc    Creating a quote
// @access  Private
router.post(
    '/',
    [
        auth,
        [
            check('gallons', 'Gallons requested is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const profile = await Profile.findOne({ user: req.user.id });

            const newQuote = new Quote({
                user: req.user.id,
                gallons: req.body.gallons,
                delivery_add: req.body.delivery_add,
                delivery_date: req.body.date
            });

            const quote = await newQuote.save();

            res.json(quote);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   GET api/quote/me
// @desc    Get specific user quotes
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const quote = await Quote.find({ user: req.user.id });

        if (!quote) {
            return res.status(400).json({ msg: 'Quotes not found' });
        }

        res.json(quote);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Quotes not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   GET api/quote
// @desc    Get all user quotes
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const quotes = await Quote.find().sort({
            date: -1
        });
        res.json(quotes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/quote/:id
// @desc    Delete quotes
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);

        if (!quote) {
            return res.status(404).json({ msg: 'Quote not found' });
        }

        // Check user
        if (quote.user.toString() !== req.user.id) {
            return res.status(401).json({ mgs: 'User not authorized' });
        }

        await quote.remove();

        res.json({ msg: 'Quote removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Quotes not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
