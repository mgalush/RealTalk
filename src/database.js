const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const processUtil = require('./util/process_util')

// Connection URL
const url = process.env.MONGO_URL || 'mongodb://localhost:27017';

// Database Name
const dbName = 'RealTalk';
const collectionName = 'RealTalk';

let collection;
// Use connect method to connect to the server
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    assert.equal(null, err);
    console.log("[mongo] client connected");

    processUtil.onExit(() => {
        if (client) {
            client.close(() => {
                console.log('[mongo] client closed');
            });
        }
    })

    const db = client.db(dbName);

    collection = db.collection(collectionName);
});

module.exports = () => {
    if (!collection) {
        throw('mongo collection is not defined');
    }
    return collection;
}