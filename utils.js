const bcrypt = require('bcrypt-nodejs');

function generateHash(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, null, null, (error, hash) => {
            if(error) {
                return reject(error);
            }

            resolve(hash);
        });
    });
}

function compareHash(password, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (error, result) => {
            if(error) {
                return reject(error);
            }

            resolve(result);
        });
    });
}

module.exports = {
    generateHash,
    compareHash
};