'use strict';

var mongoose = require('mongoose'),
    hal = require("hal"),
    Video = mongoose.model('Video');


exports.list = function(req, res) {
  var resource = new hal.Resource({}, '/');
  resource.link('videos', '/videos');
  //ExpressJS apprend a charset=utf-8 in content-type, sending a buffer allows to disable that.
  res.send(200, new Buffer(JSON.stringify(resource)));
};
