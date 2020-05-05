const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let sessionSchema = new mongoose.Schema({
	sskey: String,
	// cart: {
	// 	type:Object,
	// 	bookId: Number
	// }
	cart: [
    {
      bookId: { type: Schema.Types.ObjectId, ref: "Book" },
      quantity: Number
    }
  ]
});


let Session = mongoose.model('Session', sessionSchema, 'session');

module.exports = Session;