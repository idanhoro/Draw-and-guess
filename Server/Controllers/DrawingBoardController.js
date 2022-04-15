//const drawing = {ready: false, data : []}
// const drawing = {}

module.exports.getDrawingData = async (req, res) => {
    try {
        if(!(req.headers["room-id"] in serverData)){
            return res.status(200).json({ready: false, data : []})
        }
        return res.status(200).json(serverData[req.headers["room-id"]].drawing)
        

    } catch (error) {
        console.log(error)
        return res.status(400).send("Error occurred during sending drawing data")
    }
}
module.exports.sendDrawingData = async (req, res) =>{
    try {
        serverData[req.headers["room-id"]].drawing = {data:req.body, ready:true}
        return res.status(200).send('Drawing sent successfully')
        
    } catch (error) {
        console.log(error)
        return res.status(400).send("Error occurred during upload drawing data")
        
    }
}

module.exports.deleteDrawingData = async (req, res) => {
    try {
        serverData[req.headers["room-id"]].drawing.data = []
        serverData[req.headers["room-id"]].drawing.ready = false
        return res.status(200).send('Drawing deleted successfully')
        
    } catch (error) {
        console.log(error)
        return res.status(400).send("Error occurred during deleting drawing data")
    }
}
