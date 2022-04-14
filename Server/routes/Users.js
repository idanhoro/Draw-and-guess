const router = require('express').Router();
const UsersController = require('../Controllers/UsersController')

router.get('/getRoomID', UsersController.getRoomID)

router.post('/releaseRoom', UsersController.releaseRoom)

router.post('/joinRoom', UsersController.joinRoom)

router.get('/checkIfJoined', UsersController.checkIfJoined)

router.get('/checkIfRoundOver', UsersController.checkIfRoundOver)

router.get('/getSessionScore' , UsersController.getSessionScore)


module.exports = router;