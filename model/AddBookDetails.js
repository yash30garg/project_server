var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AddBookSchema = new Schema({
    isbn: {
        type: String

    },
    title: {
        type: String
    },
    author: {
        type: String
    },
    category: {
        type: String
    },
    publisher: {
        type: String
    },
    rating: {
        type: Number
    },
    copies: {
        type: Number
    },
    url: {
        type: String
    },
    year: {
        type: String
    }

});

var AddBooks = mongoose.model('AddBooks', AddBookSchema, 'Books');
module.exports = AddBooks;