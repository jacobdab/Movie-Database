const mongoose = require('mongoose');


const moviesSchema = new mongoose.Schema({
  title: {type: String},
  year: {type: String},
  rated: {type: String},
  released: {type: Date},
  runtime: {type: String},
  genre: [{type: String}],
  director: {type: String},
  writer: [{type: String}],
  actors: [{type: String}],
  plot: {type: String},
  language: [{type: String}],
  country: [{type: String}],
  awards: [{type: String}],
  poster: {type: String},
  ratings: [{type: Object}],
  type: {type: String},
  boxOffice: {type: String},
  production: {type: String},
  imdbRating: {type: Number},
  imdbID: {type: String},
  website: {type: String},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comments'}]
});

module.exports = mongoose.model('Movies', moviesSchema);
