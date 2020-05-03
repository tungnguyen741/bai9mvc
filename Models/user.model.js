const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
	name: String,
	age: String,
	sex: String,
	password: String,
	email: String,
	isAdmin: Boolean,
	wrongLoginCount: Number,
	avatarUrl: String
});

let User = mongoose.model('User', userSchema, 'users');

module.exports = User;