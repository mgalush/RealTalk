
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

require('./routes')(app);

const server = app.listen(app.get('port'), function(){
    console.log('Express server is listening');
});

function exitHandler() {
    if (server) {
        server.close(function() {
            console.log('express server closed');
        });
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