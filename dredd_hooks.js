
const hooks = require('hooks');

let mongoose = require('mongoose');
let Video = require('./models/VideoModel');

mongoose.Promise = global.Promise;

// Setup database connection before Dredd starts testing
hooks.beforeAll((transactions, done) => {
  hooks.log("Creating test database");
  mongoose.connect('mongodb://localhost/VideoTestDB', { useMongoClient: true }, function(err){
    done(err);
  });
});

// Close database connection after Dredd finishes testing
hooks.afterAll((transactions, done) => {
  hooks.log("Closing mongo connection");
  mongoose.connection.close()
  done();
});


// After each test clear contents of the database (we want isolated tests)
hooks.afterEach((transaction, done) => {
  hooks.log("Droping test video collection");
  Video.collection.drop();
  done();
});


// To test work with Videos in isolation, we need to add some prior
// to certain HTTP transactions Dredd is about to make

hooks.beforeEach(function (transaction, done) {
  var newVideo = new Video({
    '_id': "5a37c635d0b9c242af40fcda",
    'title': 'My dredd title',
    'description': 'An example of a video description',
    'channel': 'samir',
    'sourceURL': 'http://techslides.com/demos/sample-videos/small.mp4'
  });

  newVideo.save(function(err, video) {
    if (err)
    {
      hooks.log("Error in saving video object");
      hooks.log(video);
      done(err);
    }
    hooks.log("Saving video object : OK");
    done();
  });
});
