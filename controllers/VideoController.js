'use strict';

var mongoose = require('mongoose'),
    hal = require("hal"),
    Video = require('../models/VideoModel');


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
    if (err)
      res.send(err);
    if (null != video)
    {
      var resource = new hal.Resource(video.toJSON(), '/video/' + video._id);
      resource.link('edit', '/video/' + video._id);
      resource.link('delete', '/video/' + video._id);
      res.send(200, new Buffer(JSON.stringify(resource)));
    } else {
      res.send(404, new Buffer(''));
    }
  });
};
