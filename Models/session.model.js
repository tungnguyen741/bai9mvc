const mongoose = require('mongoose');

let sessionSchema = new mongoose.Schema({
	sskey: String,
	cart: {
		type:Object,
		bookId: Number
	}
});

let Session = mongoose.model('Session', sessionSchema, 'session');

module.exports = Session;