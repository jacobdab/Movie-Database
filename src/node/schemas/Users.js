const mongoose = require('mongoose'),
  passportLocalMongoose = require('passport-local-mongoose');


const usersSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String},
  email: {type: String},
  premium: {type: Boolean, required: true, default: false},
  isAdmin: {type: Boolean, default: false},
  accountCreated: {type: Date, required: true, default: Date.now()},
  lastLogin: {type: Date},
});
usersSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users', usersSchema);
