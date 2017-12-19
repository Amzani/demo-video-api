'use strict';
let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
require('mongoose-type-url');
let Schema = mongoose.Schema;

const schemaOptions = {
    toObject: {
      virtuals: true
    }
    ,toJSON: {
      virtuals: true
    }
};

let VideoSchema = new Schema({
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
    required: 'Kindly enter the channel of the video',
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  embedURL: {
    type: mongoose.SchemaTypes.Url,
    default: 'http://www.example.com/embed/1234'
  },
  sourceURL: {
    type: mongoose.SchemaTypes.Url,
    required: 'Kindly provide a video source URL, eg: MP4...'
  }
}, schemaOptions);

VideoSchema.virtual('id').get(function () {
  return this._id;
});

VideoSchema.methods.toJSON = function() {
  var obj = this.toObject()
  delete obj._id
  delete obj.__v
  delete obj.createdDate
  return obj
}

VideoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Video', VideoSchema);
