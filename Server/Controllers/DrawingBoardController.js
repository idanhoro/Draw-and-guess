const drawing = {ready: false, data : []}

module.exports.getDrawingData = async (req, res) => {
    try {
        
        return res.status(200).json(drawing)

    } catch (error) {
        console.log(error)
        return res.status(400).send("Error occurred during sending drawing data")
    }
}
module.exports.sendDrawingData = async (req, res) =>{
    try {
        //console.log(req.body.length)
        drawing.data = req.body;
        drawing.ready = true;
        return res.status(200).send('Drawing sent successfully')
        
    } catch (error) {
        console.log(error)
        return res.status(400).send("Error occurred during sending drawing data")
        
    }
}

module.exports.deleteDrawingData = async (req, res) => {
    try {
        drawing.data = []
        drawing.ready = false
        return res.status(200).send('Drawing deleted successfully')
        
    } catch (error) {
        console.log(error)
        return res.status(400).send("Error occurred during deleting drawing data")
    }
}
