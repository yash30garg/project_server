var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BookSchema=new Schema (
{
 isbn:{
    type:String
    
  },
  title:{
    type:String
  },
  author:{
    type:String
  },
  category:{
    type:String
  },
 pulisher :{
     type:String
 },
rating:{
     type:Number
},
copies:{
     type:Number
},
url:{
    type:String
  },
 year :{
     type:String
 },
 reviews:[{

     name:{
        type:String
     },

     title:{
         type:String
     },
     imageUrl:{
         type:String
     },
     description:{
        type:String
     }
 }]

}
);

var Books = mongoose.model('BooksDetails', BookSchema, 'Books' );
module.exports = Books;