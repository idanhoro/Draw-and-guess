import React, { useEffect, useState, useRef } from 'react'
import Axios from 'axios'
import classes from './WordChoosingButtons.module.css'
import { useNavigate } from 'react-router'

function WordChoosingButtons() {
    const [wordBank, setWordBank] = useState([])

    const navigate = useNavigate()
    useEffect(() => {
        Axios.get('http://localhost:3008/Words/getRandomsWords')
            .then((res) => {
                setWordBank(res.data)
            }).catch((error) => {
                console.log(error)
            })
    }, [])
    const sendWord = (event) => {
        Axios.post('http://localhost:3008/words/receivingChosenWord', 
        { word: event.currentTarget.textContent },
        { headers: { "room-id": localStorage.getItem("RoomID") } })
            .then((res) => {
                navigate('/draw')
            }).catch((error) => {
                console.log(error)
            })
        console.log(event.currentTarget.textContent)

    }
    return (
        <div className={classes.container}>
            <h1>Word choosing</h1>
            {wordBank.map((item) => {
                return (<div><br />
                    <button onClick={sendWord}><span>{item}</span></button>
                </div>
                )
            })}
        </div>
    )

}
export default WordChoosingButtons