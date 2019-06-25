const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  text: {type: String},
  createdAt: {type: Date, default: Date.now()},
  author: {
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    username: {type: String}
  }
});

module.exports = mongoose.model('Comments', commentsSchema);
