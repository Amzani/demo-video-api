'use strict';

var mongoose = require('mongoose'),
  Video = mongoose.model('Video');


exports.list = function(req, res) {
  Video.find({}, function(err, videos) {
    if (err)
      res.send(err);
    res.json(videos);
  });
};
