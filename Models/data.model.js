const mongoose = require('mongoose');

let bookSchema = new mongoose.Schema({
	title: String,
	image: String,
	description: String
});

let Book = mongoose.model('Book', bookSchema, 'data');

module.exports = Book;