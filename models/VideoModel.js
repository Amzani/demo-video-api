'use strict';
var mongoose = require('mongoose');
require('mongoose-type-url');
var Schema = mongoose.Schema;


var VideoSchema = new Schema({
  title: {
    type: String,
    required: 'Kindly enter the title of the video'
  },
  description: {
    type: String,
    required: 'Kindly enter the description of the video'
  },
  channel: {
    type: String,
    required: 'Kindly enter the channel of the video'
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  embedURL: {
    type: mongoose.SchemaTypes.Url
  },
  sourceURL: {
    type: mongoose.SchemaTypes.Url,
    required: 'Kindly provide a video source URL, eg: MP4...'
  }
});

module.exports = mongoose.model('Video', VideoSchema);
