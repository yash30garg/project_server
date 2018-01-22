var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  mid:{
    type:String,
    unique:true,
    required:true
  },
  name:{
    type:String
  },
  email:{
    type:String
  },
  role:{
    type:String
  },
  borrowedBooks:[{
    isbn:{
      type:String
    },
    title:{
      type:String
    },
    borrowedDate:{
      type:String
    },
    returnDate:{
      type:String
    },
    isRenewed:{
      type:String
    }
  }],
  wishlist:[{
    isbn:{
      type:String
    }
  }]
});

var UserTest = mongoose.model('Users', UserSchema, 'Users' );
module.exports = UserTest;