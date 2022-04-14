import React, { useEffect, useState, useRef } from 'react'
import Axios from 'axios'
import classes from './WordChoosingButtons.module.css'
import { useNavigate } from 'react-router'
import server from '../ServerInfo'

function WordChoosingButtons() {
    const [wordBank, setWordBank] = useState([])

    const navigate = useNavigate()
    useEffect(() => {
        Axios.get(`${server}/Words/getRandomsWords`)
            .then((res) => {
                setWordBank(res.data)
            }).catch((error) => {
                console.log(error)
            })
    }, [])
    const sendWord = (event) => {
        Axios.post(`${server}/words/receivingChosenWord`, 
        { word: event.currentTarget.textContent },
        { headers: { "room-id": localStorage.getItem("RoomID") } })
            .then((res) => {
                navigate('/draw')
            }).catch((error) => {
                console.log(error)
            })
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