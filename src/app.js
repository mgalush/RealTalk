
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

app.get('/friends', function(req, res){
    collection.findOne({}, function(error, topic){
        topic.topic = topic['﻿topic'];
        console.log(topic);
        res.render('friends', {topic: topic});
    });
    
});

app.get('/family', function(req, res){
    res.render('family');
});

app.get('/relationship', function(req, res){
    res.render('relationship');
});



const server = app.listen(3000, function(){
    console.log('Express server is listening');
});