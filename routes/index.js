const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const usersRouter = require('./users');

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use((req, res, next) => {
    res.status(404).json({
        message: 'Page Not Found'
    });
});
router.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message
    });
});

module.exports = router;