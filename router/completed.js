const express = require('express')
const router = express.Router()
const completedController = require('../controller/completed')

router.get('/',completedController.getAllDetails)
router.post('/add',completedController.postDetails)

module.exports = router