const express = require('express');
const router = express.Router();

// @route   GET api/quote
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Quote route'));

module.exports = router;
