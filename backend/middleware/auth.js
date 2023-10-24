const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers
    if(!authorization) return res.status(400).json({error: "Unauthorized"})
    const token = authorization.split(' ')[1]
    try{
        const {_id} = jwt.verify(token, process.env.SECRET_HASH)
        req.user = await User.findOne({ _id }).select('_id')
        next()
    } catch(error){
        return res.status(400).json({error: `${error}`})
    }
}

module.exports = requireAuth