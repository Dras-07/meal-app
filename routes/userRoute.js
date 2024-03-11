const express = require('express');
const router = express.Router();
const { signUpUser, signInUser, signOutUser } = require('../authentication');

// Sign-up route
router.post('/signup', async (req, res) => {
    const { email, password,username } = req.body;
    try {
        const user = await signUpUser(email, username,password);
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Sign-in route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await signInUser(email, password);
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Sign-out route
router.get('/signout', async (req, res) => {
    try {
        await signOutUser();
        res.status(200).json({ message: 'User signed out successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
