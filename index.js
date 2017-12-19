var express = require('express'),
    app = express(),
    port = process.env.PORT || 80,
    mongoose = require('mongoose'),
    routes = require('./routes/VideoRoutes'),
    middlewares = require('./middlewares'),
    bodyParser = require('body-parser');

express.static.mime.charsets.lookup=function(){}
mongoose.Promise = global.Promise;

if ('dredd' == process.env.NODE_ENV)
{
  mongoose.connect('mongodb://localhost/VideoTestDB', { useMongoClient: true });
}
else
{
  mongoose.connect('mongodb://localhost/VideoDB', { useMongoClient: true });
}

console.log('Test Mode:', process.env.NODE_ENV);



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(middlewares.contentType);

routes(app);

app.listen(port);

console.log('RESTful API server started on: ' + port);
