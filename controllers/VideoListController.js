'use strict';

let mongoose = require('mongoose'),
    hal = require("hal"),
    Video = require('../models/VideoModel');


exports.list = function(req, res) {
  let offset = req.query.offset || 0;
  let limit  = req.query.limit || 5;
  let halResults = []

  let options = {
      sort: { date: -1 },
      offset: parseInt(offset),
      limit: parseInt(limit)
  };
  Video.paginate({}, options).then(function(result) {
    let lastOffset = result.total - (result.total%5);
    let nextOffset = offset+5;
    let resource = new hal.Resource({}, '/videos');
    resource.link('create', '/videos');
    resource.link('next', '/videos?offset=' + nextOffset + '&limit=5');
    resource.link('first', '/videos?offset=0&limit=5');
    resource.link('last', '/videos?offset='+ lastOffset +'&limit=5');
    for (var key in result.docs) {
        if (result.docs.hasOwnProperty(key)) {
            let resourceHal = new hal.Resource(result.docs[key].toJSON(), '/video/' + result.docs[key]._id);
            resourceHal.link('edit', '/video/' + result.docs[key]._id);
            resourceHal.link('delete', '/video/' + result.docs[key]._id);
            halResults.push(resourceHal);
        }
    }
    resource.embed('videos', halResults);
    res.send(200, new Buffer(JSON.stringify(resource)));
  });
};

exports.create = function(req, res) {
  let newVideo = new Video(req.body);

  newVideo.save(function(err, video) {
    if (err)
      res.send(err);
    let resource = new hal.Resource(video.toJSON(), '/video/' + video._id);
    resource.link('edit', '/video/' + video._id);
    resource.link('delete', '/video/' + video._id);
    res.send(201, new Buffer(JSON.stringify(resource)));
  });
};
