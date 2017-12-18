'use strict';


exports.contentType = function(req, res, next) {
  res.removeHeader('content-type');
  res.setHeader('content-type', 'application/hal+json');
  next();
};
