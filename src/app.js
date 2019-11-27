
const express = require('express');
const app = express();
const processUtil = require('./util/process_util')

const server = app.use(express.static(__dirname + '/public'))
                  .use(require('./routes'))
                  .set('view engine', 'ejs')
                  .set('port', process.env.PORT || 3000)
                  .listen(app.get('port'), () => {
                      console.log('[express] server listening');
                  });

processUtil.onExit(() => {
    if (server) {
        server.close(() => {
            console.log('[express] server closed');
        });
    }
});