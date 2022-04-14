const randomWords = require('random-words');

const getWordsAtMaxAndMinLength = (options) => {
    var rightSize = false;
    var wordUsed;
    while (!rightSize) {
        wordUsed = randomWords();
        if (wordUsed.length <= options.maxLength && wordUsed.length >= options.minLength) {
            rightSize = true;
        }
    }
    return wordUsed;
}

module.exports.getRandomWords = async (req, res) => {
    try {
        const words = [
            getWordsAtMaxAndMinLength({ minLength: 3, maxLength: 4 }),
            getWordsAtMaxAndMinLength({ minLength: 5, maxLength: 5 }),
            getWordsAtMaxAndMinLength({ minLength: 6, maxLength: 6 })
        ]
        return res.status(200).json(words)

    } catch (error) {
        console.log(error)
        return res.status(400).send("Error occurred during sending random words.")
    }
}

module.exports.receivingChosenWord = async (req, res) => {
    try {
        // console.log(serverData);
        serverData[req.headers["room-id"]].chosenWord = req.body.word
        return res.status(200).send("Word received successfully")
    } catch (error) {
        console.log(error)
        return res.status(400).send("Error occurred during receiving chosen word.")
    }
}

module.exports.receivingSubmitWord = async (req, res) => {
    try {
        serverData[req.headers['room-id']].roundOver = true

        const {chosenWord} = serverData[req.headers['room-id']]
        if (chosenWord === req.body.word) {
            res.status(200).json({ isMatch: true})
            } 

        else {
            res.status(200).json({ isMatch: false })
        }

        serverData[req.headers['room-id']].drawing = {data:[], ready:false}
        
    } catch (error) {
        console.log(error)
        return
    }
}

module.exports.getChosenWord = async (req, res) => {
    try {
        const chosenWord = serverData[req.headers['room-id']].chosenWord
        return res.status(200).json({ word: chosenWord })

    } catch (error) {
        return res.status(400).send("Error occurred during get the chosen word.")

    }
}

