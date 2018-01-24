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
    author:{
      type:String
    },
    publisher:{
      type:String
    },
    rating:{
      type:Number
    },
    url:{
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
    },
    title:{
      type:String
    },
    author:{
      type: String
    },
    publisher:{
      type:String
    },
    rating:{
      type:Number
    },
    url:{
      type:String
    },
    description:{
      type:String
    }
  }]
});

// var UserTest = mongoose.model('Users', UserSchema, 'Users' );
var UserTest = mongoose.model('Users', UserSchema, 'limsReact' );
module.exports = UserTest;