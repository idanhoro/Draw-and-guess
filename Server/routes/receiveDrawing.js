const router = require('express').Router();

router.post('/sendDrawing', async (req, res) => {
    console.log(req)
    res.status(200).send()
})

module.exports = router;
