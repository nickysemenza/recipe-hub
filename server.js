var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var settings = require('./settings');
var port = process.env.PORT || 8082;

mongoose.connect('mongodb://'+settings.mongo.host+':'+settings.mongo.port+'/recipe-hub');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
require('./app/routes')(app);
app.listen(port);
console.log('running on port ' + port);
exports = module.exports = app;