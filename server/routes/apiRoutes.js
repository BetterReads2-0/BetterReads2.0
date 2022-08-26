const express = require('express')

const apiController = require('../controllers/apiController.js')

const router = express.Router()

router.get('/', apiController.testController, (req, res) => {
  res.send('no bugs')
})

module.exports = router
