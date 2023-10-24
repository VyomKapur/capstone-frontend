const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/auth')
const { getItem, recommendedItems } = require('../controllers/itemsController')

router.use(requireAuth)
router.get('/:cartName', getItem)

router.post('/recommended', recommendedItems)

module.exports = router