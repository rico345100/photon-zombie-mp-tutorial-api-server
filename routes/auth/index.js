const uuid = require('uuid/v4');
const express = require('express');
const router = express.Router();
const db = require('../../db');
const { compareHash } = require('../../utils');
const { addToken, removeToken } = require('../../auth');
const { authMiddleware } = require('../../middlewares');

// Login Route
router.post('/', async (req, res, next) => {
    const { body } = req;
    const { id, password } = body;

    try {
        const user = await db.instance.collection('users').findOne({ id });

        if(!user) {
            return res.status(400).json({
                message: 'Invalid User ID'
            });
        }

        const comparePwResult = await compareHash(password, user.password);

        if(!comparePwResult) {
            return res.status(400).json({
                message: 'Invalid User Password'
            });
        }

        const newToken = uuid();
        addToken(newToken, user.id);

        res.json({
            message: 'Login Success',
            token: newToken
        });
    }
    catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

// Logout Route
router.delete('/', authMiddleware, (req, res, next) => {
    const { token } = req.query;
    removeToken(token);

    res.json({
        message: 'Logout Success'
    });
});

module.exports = router;