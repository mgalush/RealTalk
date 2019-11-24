
// FOR EXPRESS
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index');
});

app.get('/friends', function(req, res){
    res.render('friends')
});

app.get('/family', function(req, res){
    res.render('family');
});

app.get('/relationship', function(req, res){
    res.render('relationship');
});



var server = app.listen(3000, function(){
    console.log('Server is listening');
});