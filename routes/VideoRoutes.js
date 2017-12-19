'use strict';

module.exports = function(app) {
  let videoController = require('../controllers/VideoController');
  let videoListController = require('../controllers/VideoListController');
  let RootController = require('../controllers/RootController');

  app.route('/')
    .get(RootController.list)
  app.route('/videos')
    .get(videoListController.list)
    .post(videoListController.create);
  app.route('/videos/:videoId')
    .get(videoController.get)
    .patch(videoController.patch)
    .delete(videoController.delete);
};
