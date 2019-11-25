
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'RealTalk';
let collection;
// Use connect method to connect to the server
MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to mongodb server");
 
  const db = client.db(dbName);

  collection = db.collection(dbName);

//   collection.drop();
 
//   client.close();
});
app.get('/', function(req, res){
    res.render('index');
});

// url for /friends/<some number greater than zero>
app.get('/friends/:topicNumber([1-9]\\d{0,})', function(req, res){
    
    // get the number of this page
    const topicNumber = parseInt(req.params.topicNumber);

    // calculage back and number href links
    const viewModel = {};
    viewModel.back = topicNumber - 1;
    viewModel.next = topicNumber + 1;

    // query mongo for a topic, skipping by the number specified in the url
    collection.findOne({}, {skip: topicNumber-1}, function(error, topic) {

        viewModel.topic = topic;

        // render the friends ejs template and pass in variables
        res.render('friends', viewModel);
    })
});

app.get('/family', function(req, res){
    collection.aggregation({}, {cursor: {}})
});

app.get('/relationship', function(req, res){
    res.render('relationship');
});

// return 404 for all non matching routes
app.get('*', function(req, res) {
    res.send('404 bitch', 404);
})

const server = app.listen(3000, function(){
    console.log('Express server is listening');
});