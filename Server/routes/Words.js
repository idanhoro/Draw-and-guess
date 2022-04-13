const router = require('express').Router();
const WordsController = require('../Controllers/WordsController')

router.get('/getRandomsWords', WordsController.getRandomWords)

router.post('/receivingChosenWord', WordsController.receivingChosenWord)

module.exports = router;
