// occupiedRooms = []
const maxLimitRooms = 5;

module.exports.getRoomID = async (req, res) => {
    try {
        if (serverData.occupiedRooms.length == maxLimitRooms){
            return res.status(400).send("All rooms are occupied!")
        }
        let roomID = Math.floor(Math.random()* maxLimitRooms)
        while(serverData.occupiedRooms.includes(roomID)){
            roomID = Math.floor(Math.random()* maxLimitRooms)
        }
        serverData.occupiedRooms.push(roomID)
        return res.status(200).json(roomID)

    } catch (error) {
        console.log(error)
        return res.status(400).send("Error occurred during sending room ID.")
    }
}

module.exports.releaseRoom = async (req, res) => {
    try {
        const index = serverData.occupiedRooms.indexOf(req.body.roomID)
        serverData.occupiedRooms.splice(index, 1)
        //TODO: Change to localStorage
        delete serverData.drawing[req.body.roomID]
        return res.status(200).send("Room released successfully")
        
    } catch (error) {
        console.log(error)
        return res.status(400).send("Error occurred during releasing room.")
    }
}
