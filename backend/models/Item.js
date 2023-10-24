const mongoose = require('mongoose')

const Item = new mongoose.Schema({
	class_id: Number,
	name: String,
	quantity: Number,
	price: Number,
	weight: Number
});

module.exports = Item