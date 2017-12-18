'use strict';

var mongoose = require('mongoose'),
    hal = require("hal"),
    Video = mongoose.model('Video');


exports.list = function(req, res) {
  Video.find({},
      {
        __v: false,
        createdDate: false,
        sourceURL: false
      }, function(err, videos) {
    if (err)
      res.send(err);
    console.log(videos);
    res.json(videos);
  });
};

exports.create = function(req, res) {
  var newVideo = new Video(req.body);

  newVideo.save(function(err, video) {
    if (err)
      res.send(err);
    var resource = new hal.Resource(video.toJSON(), '/video/' + video._id);
    resource.link('edit', '/video/' + video._id);
    resource.link('delete', '/video/' + video._id);
    res.send(201, new Buffer(JSON.stringify(resource)));
  });
};
