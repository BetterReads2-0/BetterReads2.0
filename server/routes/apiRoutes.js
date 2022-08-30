const express = require('express');
const authController = require('../controllers/authController.js');
const searchDBController = require('../controllers/searchDBController');
const updateDBController = require('../controllers/updateDBController.js');

const { checkSignup, checkLogin } = authController;
const { getPostInfo, getBookInfo, getRatingsInfo, getHashIDs, getTagInfo } = searchDBController;
const { addToBook_Table, getBook_id, addToPost_Table, addToHash_Table, addToRating_Table, addToPHJ_BHJ } = updateDBController;


const router = express.Router();

router.post('/login', checkLogin, (req, res) => {
  res.status(200).json(res.locals);
});

router.post('/signup', checkSignup, (req, res) => {
  res.status(200).json(res.locals);
});

router.get('/reviews/', getPostInfo, getBookInfo, getRatingsInfo, getHashIDs, getTagInfo, (req, res) => {
  return res.status(200).json(res.locals.reviews);
});

router.get('/reviews/:username', getPostInfo, getBookInfo, getRatingsInfo, getHashIDs, getTagInfo, (req, res) => {
  return res.status(200).json(res.locals.reviews);
})

router.post('/reviews/:username', addToBook_Table, getBook_id, addToPost_Table, addToHash_Table, addToRating_Table, addToPHJ_BHJ, (req, res) => {
  return res.status(200).json("post review");
});

module.exports = router;
