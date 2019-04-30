const { tokens, isValidToken } = require('./auth');

function authMiddleware(req, res, next) {
    const { token, id } = req.query;

    if(!token) {
        return next(new Error('Token is missing!'));
    }
    else if(!id) {
        return next(new Error('ID is missing!'));
    }

    const isValid = isValidToken(token, id);

    if(!isValid) {
        return next(new Error('Invalid Token!'));
    }

    return next();
}

module.exports = {
    authMiddleware
};