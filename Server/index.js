const express = require('express')
const cors = require('cors')

const DrawingBoard = require('./routes/DrawingBoard')
const Words = require('./routes/Words')
const Users = require('./routes/Users')

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json({limit:'50mb'}))
app.use('/drawingBoard', DrawingBoard)
app.use('/words', Words)
app.use('/users', Users)


app.listen(3008, () => {
    console.log('Server is running on port 3008')
})

app.get('/', (req, res) => {
    res.send('Server is up and running.')
})
