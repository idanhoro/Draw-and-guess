const randomWords = require('random-words');

const getWordsAtMaxAndMinLength = (options) => {
    var rightSize = false;
    var wordUsed;
    while (!rightSize) {  
      wordUsed = randomWords();
      if(wordUsed.length <= options.maxLength && wordUsed.length >= options.minLength) {
        rightSize = true;
      }
    }
    return wordUsed;
}

module.exports.getRandomWords = async (req, res) => {
    try {
        const words = [
            getWordsAtMaxAndMinLength({minLength:3 ,maxLength:4}),
            getWordsAtMaxAndMinLength({minLength:5 ,maxLength:5}),
            getWordsAtMaxAndMinLength({minLength:6 ,maxLength:6})
        ]
        return res.status(200).json(words)

    } catch (error) {
        console.log(error)
        return res.status(400).send("Error occurred during sending random words.")
    }
}

module.exports.receivingChosenWord = async (req,res) => {
    try {
        console.log(res)
    } catch (error) {
        console.log(error)
        return res.status(400).send("Error occurred during receiving chosen word.")
    }
}
