'use strict';

var mongoose = require('mongoose'),
    Video = mongoose.model('Video');


exports.delete = function(req, res) {
  Video.remove({
    _id: req.params.videoId
  }, function(err, video) {
    if (err)
      res.send(err);
    res.send(204, new Buffer(""));
  });
};

exports.get = function(req, res) {
  Video.findById(req.params.videoId, function(err, video) {
    console.log(video);
    if (err)
      res.send(err);
    res.send(200, new Buffer(JSON.stringify(video)));
  });
};
