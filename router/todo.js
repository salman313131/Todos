const express = require('express')
const router = express.Router()
const todoController = require('../controller/todo')

router.get('/',todoController.getAllDetails)
router.post('/add',todoController.postDetails)
router.delete('/:userId',todoController.deleteUser)
router.get('/:userId',todoController.getDetail)

module.exports = router