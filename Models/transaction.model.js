
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  userId: String,
  bookId:  String,
  isComplete: Boolean
});

 
let Transaction = mongoose.model('Transaction', transactionSchema, 'transaction');

module.exports = Transaction;





module.exports = Transaction;
