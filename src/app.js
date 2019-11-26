
const express = require('express');
const app = express();
const processUtil = require('./util/process_util')

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

require('./routes')(app);

const server = app.listen(app.get('port'), () => {
    console.log('[express] server listening');
});

processUtil.onExit(() => {
    if (server) {
        server.close(() => {
            console.log('[express] server closed');
        });
    }
});