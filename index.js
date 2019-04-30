const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const server = express();
const routes = require('./routes');
const db = require('./db');

server.use(logger('combined'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(methodOverride((req, res) => {
    if(req.body && "_method" in req.body) {
        const method = req.body._method;
        delete req.body._method;

        return method;
    }
}));

server.use('/', routes);

server.listen(3000, async () => {
    try {
        await db.init();
    }
    catch(error) {
        console.error('Failed to connect DB: ' + error);
        process.exit(1);
        return;
    }

    console.log('API Server Listening on Port 3000...');
});