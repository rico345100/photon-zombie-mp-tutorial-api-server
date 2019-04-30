const MongoClient = require('mongodb').MongoClient;
const dbName = 'UnityZombieGame';
let m_Instance;

async function init() {
    const client = await MongoClient.connect('mongodb://localhost:27017', {
        useNewUrlParser: true
    });

    m_Instance = client.db(dbName);

    console.log('DB Connected.');
}

module.exports = {
    init,
    get instance() {
        return m_Instance;
    }
};
