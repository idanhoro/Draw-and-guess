// occupiedRooms = []
const maxLimitRooms = 5;

const getAvilableRoom = () => {
    let roomID = Math.floor(Math.random()* maxLimitRooms)
    while(roomID in serverData ){
        roomID = Math.floor(Math.random()* maxLimitRooms)
    }
    return roomID
}

module.exports.getRoomID = async (req, res) => {
    try {
        if (serverData.length == maxLimitRooms){
            return res.status(400).send("All rooms are occupied!")
        }
        const roomID = getAvilableRoom()
        serverData[roomID] = {drawing:{data:[], ready:false}, occupied : false, chosenWord:"", roundOver : false, SessionScore: 0}
        return res.status(200).json(roomID)

    } catch (error) {
        console.log(error)
        return res.status(400).send("Error occurred during sending room ID.")
    }
}

module.exports.releaseRoom = async (req, res) => {
    try {
        delete serverData[req.headers["room-id"]]
        return res.status(200).send("Room released successfully")
        
    } catch (error) {
        console.log(error)
        return res.status(400).send("Error occurred during releasing room.")
    }
}
module.exports.joinRoom = async (req, res) => {
    try {
        const {roomID} = req.body
        if(!(roomID in serverData)){
            return res.status(500).send("This room is not exist!")
        }
        if(serverData[roomID].occupied){
            return res.status(500).send("This room is already full")
        }
        serverData[roomID].occupied = true;
        return res.status(200).send(roomID)
        
    } catch (error) {
        console.log(error)
        return res.status(400).send("Error occurred during joining room.")
    }
}

module.exports.checkIfJoined =async (req,res) => {
    try {
        return res.status(200).send(serverData[req.headers["room-id"]].occupied)
    } catch (error) {
        console.log(error)
        return res.status(400).send("Error occurred during checking if second player joined the room.")
    }
}

module.exports.checkIfRoundOver = async (req,res) =>{
    try {
        return res.status(200).send(serverData[req.headers['room-id']].roundOver)
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error occurred during checking if the round is over")
    }
}
module.exports.getSessionScore = async (req, res) => {
    try {
        const SessionScore = serverData[req.headers['room-id']].SessionScore
        return res.status(200).json(SessionScore)    
    } catch (error) {
        return res.status(400).send("Error occurred during get the session score.")

    }
}