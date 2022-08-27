const express = require('express');
const authController = require('../controllers/authController.js');
const reviewsController = require('../controllers/reviewsController.js');

const { addToBook_Table, getBook_id, addToPost_Table, addToHash_Table } = reviewsController;

const router = express.Router()

router.post('/login', (req, res) => {
  res.send('post login')
})

router.post('/signup', (req, res) => {
  res.send('post signup')
})

router.get('/reviews/:username', (req, res) => {
  res.send('get reviews')
})

router.post('/reviews/:username', addToBook_Table, getBook_id, addToPost_Table, addToHash_Table, (req, res) => {
  res.send('post reviews')
})

module.exports = router
