const mongoose = require('mongoose')

/*
	Create todo schema
*/
const TodoSchema = new mongoose.Schema({
	name: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

/*
	Create UserSchema
*/
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	todos: [TodoSchema],
	registerDate: {
		type: Date,
		default: Date.now
	}
})

module.exports = User = mongoose.model('User', UserSchema)
