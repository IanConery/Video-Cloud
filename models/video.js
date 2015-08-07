var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;

var videoSchema = new Schema({
  videoprovider: String,
  videoid: String,
  videourl: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  commentCount: Number
});

videoSchema.plugin(findOrCreate);

module.exports = mongoose.model('Video', videoSchema);