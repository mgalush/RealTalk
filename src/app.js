
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const send404 = function(req, res) {
    res.status(404).send('404 bitch');
};

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
});
app.get('/', function(req, res){
    res.render('index');
});

// url for /<some category>/<some number greater than zero>
app.get('/topic/:category/:topicNumber([1-9]\\d{0,})', function(req, res){

    // get the category
    const category = req.params.category;
    
    // get the number of this page
    const topicNumber = parseInt(req.params.topicNumber);

    // calculate back and number href links
    const viewModel = {};
    viewModel.back = topicNumber - 1;
    viewModel.next = topicNumber + 1;

    // query mongo for a topic, skipping by the number specified in the url
    collection.findOne({category: category}, {skip: topicNumber-1}, function(error, topic) {
        if(!topic) {
            send404(req, res);
            return;
        }

        viewModel.topic = topic;

        // render the friends ejs template and pass in variables
        res.render('category', viewModel);
    });
});

// return 404 for all non matching routes
app.get('*', send404);

const server = app.listen(3000, function(){
    console.log('Express server is listening');
});