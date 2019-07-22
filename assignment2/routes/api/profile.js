const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            ['name', 'avatar']
        );

        if (!profile) {
            return res
                .status(400)
                .json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/profile
// @desc    Create or Update profile
// @access  Private
router.post(
    '/',
    [
        auth,
        [
            check('Address_1', 'Address is required')
                .not()
                .isEmpty(),
            check('City', 'City is required')
                .not()
                .isEmpty(),
            check('State', 'State is required')
                .not()
                .isEmpty(),
            check('Zipcode', 'Zipcode is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { Address_1, City, State, Zipcode } = req.body;
        // Build Profile Object]
        const profileFeilds = {};
        profileFeilds.user = req.user.id;

        if (Address_1) profileFeilds.Address_1 = Address_1;
        if (City) profileFeilds.City = City;
        if (State) profileFeilds.State = State;
        if (Zipcode) profileFeilds.Zipcode = Zipcode;

        try {
            let profile = await Profile.findOne({ user: req.user.id });
            if (profile) {
                // Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFeilds },
                    { new: true }
                );
                return res.json(profile);
            }

            // Create
            profile = new Profile(profileFeilds);

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   GET api/profile
// @desc    Get all profile
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', [
            'name',
            'avatar'
        ]);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id
        }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/profile
// @desc    DELETE profile, user, and quotes
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // @TODO and Quotes

        // Remove Profile
        await Profile.findOneAndRemove({ user: req.user.id });

        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
