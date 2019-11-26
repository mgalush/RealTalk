module.exports = {
    onExit: (callback) => {
        //do something when app is closing
        process.on('exit', callback);
    
        //catches ctrl+c event
        process.on('SIGINT', callback);
    
        // catches "kill pid" (for example: nodemon restart)
        process.on('SIGUSR1', callback);
        process.on('SIGUSR2', callback);
    
        //catches uncaught exceptions
        process.on('uncaughtException', callback);
    } 
}