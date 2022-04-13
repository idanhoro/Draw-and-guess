//const drawing = {ready: false, data : []}
// const drawing = {}

module.exports.getDrawingData = async (req, res) => {
    try {
        if(!(req.headers["room-id"] in serverData.drawing)){
            return res.status(200).json({ready: false, data : []})
        }
        // console.log(drawing.req.headers["room-id"])
        return res.status(200).json(serverData.drawing[req.headers["room-id"]])
        

    } catch (error) {
        console.log(error)
        return res.status(400).send("Error occurred during sending drawing data")
    }
}
module.exports.sendDrawingData = async (req, res) =>{
    try {
        serverData.drawing[req.headers["room-id"]] = {data:req.body, ready:true}
        return res.status(200).send('Drawing sent successfully')
        
    } catch (error) {
        console.log(error)
        return res.status(400).send("Error occurred during upload drawing data")
        
    }
}

module.exports.deleteDrawingData = async (req, res) => {
    try {
        serverData.drawing[req.headers["room-id"]].data = []
        serverData.drawing[req.headers["room-id"]].ready = false
        return res.status(200).send('Drawing deleted successfully')
        
    } catch (error) {
        console.log(error)
        return res.status(400).send("Error occurred during deleting drawing data")
    }
}
