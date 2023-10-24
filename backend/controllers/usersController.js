const User = require('../models/User')
const jwt = require('jsonwebtoken')

const loginUser = async(req, res) => {
    const { email, password } = req.body
    if(!email || !password){
        return res.status(400).json({Message: "All fields required"})
    }
    try{
        const user = await User.login(email, password)
        const _id = user._id
        const token = jwt.sign({_id}, process.env.SECRET_HASH, { expiresIn: '1d'})
        res.status(200).json({user_id: user._id, token: token})
    } catch(error){
        return res.status(400).json({Message: `${error}`})
    }

}

const signupUser = async(req, res) => {
    const { email, name, password } = req.body
    if(!email || !name || !password){
        return res.status(400).json({Message: "All fields required"})
    }
    try{
        const user = await User.signup(email, name, password)
        const _id = user._id
        const token = jwt.sign({_id}, process.env.SECRET_HASH, { expiresIn: '1d'})
        res.status(200).json({user_id: user._id, token: token})
    } catch(error){
        return res.status(400).json({Message: `${error}`})
    }
    
}

module.exports = {
    loginUser,
    signupUser
}