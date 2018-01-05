var mongoose = require('mongoose');
var bcrypt = require('bcrypt')
var users = require('http://limsreactapi.azurewebsites.net/api/UsersInfo')
var books = require('http://limsreactapi.azurewebsites.net/api/Books')

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  mid: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
});

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
    console.log(users)
  User.findOne({ users: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}



var User = mongoose.model('User', UserSchema);
module.exports = User;

