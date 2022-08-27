const express = require('express');
const authController = require('../controllers/authController.js');
const reviewsController = require('../controllers/reviewsController.js');

const { addToBook_Table, getBook_id, addToPost_Table, addToHash_Table, addToRating_Table, addToPost_Hash_Join } = reviewsController;

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

router.post('/reviews/:username', addToBook_Table, getBook_id, addToPost_Table, addToHash_Table, addToRating_Table, addToPost_Hash_Join, (req, res) => {
  return res.status(200).json("post review");
})

module.exports = router
