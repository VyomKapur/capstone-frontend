const mongoose = require('mongoose')

const shoppingListItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('ShoppingList', shoppingListItemSchema);