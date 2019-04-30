const express = require('express');
const router = express.Router();
const db = require('../../db');
const { generateHash } = require('../../utils');
const { authMiddleware } = require('../../middlewares');

// Get User Info (requires Login)
router.get('/:id', authMiddleware, async (req, res, next) => {
    const { id } = req.params;
    const user = await db.instance.collection('users').findOne({ id });

    res.json(user);
});

// Create new User
router.post('/', async (req, res, next) => {
    const { body } = req;
    const { id, password } = body;
    const hash = await generateHash(password);

    await db.instance.collection('users').insertOne({
        id,
        password: hash,
        kills: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    res.json({});
});

// Update User Info
router.put('/', authMiddleware, async (req, res, next) => {
    const { id } = req.query;
    const { body } = req;
    const { kills } = body;

    await db.instance.collection('users').updateOne({ id }, {
        $set: {
            updatedAt: new Date()
        },
        $inc: {
            kills: +kills
        }
    });

    res.json({});
});

module.exports = router;