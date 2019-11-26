const database = require('./database');

function send404(req, res) {
    res.status(404).render('404');
};

module.exports = (app) => {
    app.get('/', (req, res) => {
        database().distinct('category', (error, categories) => {
            res.render('index', {categories: categories.sort()});
        });
    });
    
    app.get("/topic/:category", (req, res) => {
        res.redirect(`${req.url}/1`)
    });
    
    // url for /<some category>/<some number greater than zero>
    app.get('/topic/:category/:topicNumber([1-9]\\d{0,})', (req, res) => {
    
        // get the category
        const category = req.params.category;
        
        // get the number of this page
        const topicNumber = parseInt(req.params.topicNumber);
    
        // calculate back and number href links
        const viewModel = {};
        viewModel.back = topicNumber - 1;
        viewModel.next = topicNumber + 1;
    
        // query mongo for a topic, skipping by the number specified in the url
        database().findOne({category: category}, {skip: topicNumber-1}, (error, topic) => {
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
}