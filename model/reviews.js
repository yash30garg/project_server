var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    isbn:{
        type: String
    },
    reviews:[{
        mid:{
            type: String
        },
        title:{
            type:String
        },
        rating:{
            type:Number
        },
        description:{
            type:String
        }
    }]
});

var Reviews = mongoose.model('Reviews', ReviewSchema, 'reviews' );
module.exports = Reviews;