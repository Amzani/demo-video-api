'use strict';

module.exports = function(app) {
  app.route('/')
    .get(RootController.list)
};
