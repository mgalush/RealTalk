const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = process.env.MONGO_URL || 'mongodb://localhost:27017';

// Database Name
const dbName = 'RealTalk';
const collectionName = 'RealTalk';

let collection;
// Use connect method to connect to the server
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to mongodb server");

    function exitHandler() {
        if (client) {
            client.close();
            console.log('closing mongo client');
        }
    }
    //do something when app is closing
    process.on('exit', exitHandler);
    //catches ctrl+c event
    process.on('SIGINT', exitHandler);
    // catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', exitHandler);
    process.on('SIGUSR2', exitHandler);
    //catches uncaught exceptions
    process.on('uncaughtException', exitHandler);

    const db = client.db(dbName);

    collection = db.collection(collectionName);
});

module.exports = function() {
    if (!collection) {
        throw('mongo collection is not defined');
    }
    return collection;
}