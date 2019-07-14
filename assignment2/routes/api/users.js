const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route POST api/user
// @desc  Register user
// @access Public
router.post(
    '/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a loger password').isLength({ min: 6 })
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // console.log(req.body);
        const { name, email, password } = req.body;
        try {
            let user = await User.findOne({email});
            
            if(user) {
                res.status(400).json({errors: [msg: 'User already exists']});
            }
        // See if user exists

        // Get users gravatar

        // Encrypt password

        // return jsonwebtoken

        res.send('User route');
        } catch (err) {
            
        }
    }
);

module.exports = router;
