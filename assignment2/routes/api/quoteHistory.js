const express = require('express');
const router = express.Router();

// @route   GET api/quoteHistory
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Quote History route'));

module.exports = router;
