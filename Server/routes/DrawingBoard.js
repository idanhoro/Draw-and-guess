const router = require('express').Router();
const DrawingBoardController = require('../Controllers/DrawingBoardController')

router.get('/getData', DrawingBoardController.getDrawingData)

router.post('/sendData', DrawingBoardController.sendDrawingData)

router.delete('/deleteData', DrawingBoardController.deleteDrawingData)


module.exports = router;
