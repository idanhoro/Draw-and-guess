const router = require('express').Router();
const UsersController = require('../Controllers/UsersController')

router.get('/getRoomID', UsersController.getRoomID)

router.post('/releaseRoom', UsersController.releaseRoom)

router.post('/joinRoom', UsersController.joinRoom)

module.exports = router;