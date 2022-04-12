const router = require('express').Router();
const WordsController = require('../Controllers/WordsController')

router.get('/getRandomsWords', WordsController.getRandomWords)

module.exports = router;
