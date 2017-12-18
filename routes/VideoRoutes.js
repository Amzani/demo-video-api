'use strict';

module.exports = function(app) {
  var videoController = require('../controllers/VideoController');
  var videoListController = require('../controllers/VideoListController');
  var RootController = require('../controllers/RootController');

  app.route('/')
    .get(RootController.list)
  app.route('/videos')
    .get(videoListController.list)
    .post(videoListController.create);


  app.route('/videos/:videoId')
    .get(videoController.get)
//    .put(videoController.update)
    .delete(videoController.delete);
};
