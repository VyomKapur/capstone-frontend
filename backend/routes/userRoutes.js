const express = require('express')
const router = express.Router()
const { loginUser, signupUser } = require('../controllers/usersController')

router.post('/login', loginUser)
router.post('/signup', signupUser)


module.exports = router