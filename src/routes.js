const database = require('./database');
const routes = new require('express').Router();

function send404(req, res) {
    res.status(404).render('404');
};

routes.get('/', (req, res) => {
    database().distinct('category', (error, categories) => {
        res.render('index', {categories: categories.sort()});
    });
});

routes.get("/topic/:category", (req, res) => {
    res.redirect(`${req.url}/1`)
});

// url for /<some category>/<some number greater than zero>
routes.get('/topic/:category/:pageNumber([1-9]\\d{0,})', async (req, res) => {

    // get the category
    const category = req.params.category;
    
    // get the number of this page
    const pageNumber = parseInt(req.params.pageNumber);

    // query mongo for a topic and the one after it, skipping by the number specified in the url
    const query = {
        category: category
    };
    const options = {
        skip: pageNumber - 1,
        limit: 2
    }
    const cursor = database().find(query, options);

    // 404 if we don't have any topics
    if (!await cursor.count()) {
        send404(req, res);
        return;
    }

    // calculate back and next href links
    const viewModel = {
        topic: await cursor.next(),
        previous: pageNumber - 1,
        next: await cursor.hasNext() ? pageNumber + 1 : 0,
    };

    // render the category ejs template and pass in view model
    res.render('category', viewModel);
});

// return 404 for all non matching routes
routes.get('*', send404);

module.exports = routes;