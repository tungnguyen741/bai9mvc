const mongoose = require('mongoose');

let transactionSchema = new mongoose.Schema({
	userId: String,
	bookId: String,
	isComplete: Boolean
});

let Transaction = mongoose.model('Transaction', transactionSchema, 'transaction');

module.exports = Transaction;