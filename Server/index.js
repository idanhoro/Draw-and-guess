const express = require('express')
const cors = require('cors')

const recevieDrawing = require('./routes/receiveDrawing')

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.listen(3008, () => {
    console.log('Server is running on port 3008')
})

app.get('/', (req, res) => {
    res.send('Server is up and running.')
})

app.post('/sendDrawing', recevieDrawing)