const express = require('express');
const authController = require('../controllers/authController.js');
const searchDBController = require('../controllers/searchDBController');
const updateDBController = require('../controllers/updateDBController.js');

const { addToBook_Table, getBook_id, addToPost_Table, addToHash_Table, addToRating_Table, addToPHJ_BHJ } = updateDBController;
const { getPostInfo, getBookInfo, getRatingsInfo } = searchDBController;

const router = express.Router()

router.post('/login', (req, res) => {
  res.send('post login')
})

router.post('/signup', (req, res) => {
  res.send('post signup')
})

router.get('/reviews/', getPostInfo, getBookInfo, getRatingsInfo, (req, res) => {
  return res.send('send back 10 most recent reviews')
})

router.get('/reviews/:username', getPostInfo, getBookInfo, getRatingsInfo, (req, res) => {
  return res.send('send back 10 most recent reviews')
})

router.post('/reviews/:username', addToBook_Table, getBook_id, addToPost_Table, addToHash_Table, addToRating_Table, addToPHJ_BHJ, (req, res) => {
  return res.status(200).json("post review");
})

module.exports = router
