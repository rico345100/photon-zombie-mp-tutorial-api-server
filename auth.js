const tokens = {};

function addToken(token, id) {
    tokens[token] = id;
}

function removeToken(token) {
    delete tokens[token];
}

function isValidToken(token, id) {
    if(!tokens[token]) {
        return false;
    }

    return (tokens[token] === id) ? true : false;
}

module.exports = {
    tokens,
    addToken,
    removeToken,
    isValidToken
};