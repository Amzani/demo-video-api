var express = require('express'),
    app = express(),
    port = process.env.PORT || 80,
    mongoose = require('mongoose'),
    Video = require('./models/VideoModel'), //created model loading here
    routes = require('./routes/VideoRoutes'),
    middlewares = require('./middlewares'),
    bodyParser = require('body-parser');

express.static.mime.charsets.lookup=function(){}
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/VideoDB', { useMongoClient: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(middlewares.contentType);

routes(app);

app.listen(port);

console.log('RESTful API server started on: ' + port);
