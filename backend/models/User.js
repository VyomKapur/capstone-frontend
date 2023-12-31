const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const shoppingList = require('./ShoppingListItem').schema;
const validator = require('validator')


const userSchema = new mongoose.Schema({
	email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
	password: {
        type: String,
        required: true
    },
	shoppingList: [
        shoppingList
    ]
});

userSchema.statics.signup = async function(email, username, password){
    if(!email || !username || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    const exists = await this.findOne({ email: email })
    if(exists){
        throw Error("Email already in use!")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, username, password: hash})
    return user
}

userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    const exists = await this.findOne({ email: email })
    if(exists){
        return exists;
    }
    throw Error("Invalid user credentials")
}

module.exports = mongoose.model('User', userSchema)