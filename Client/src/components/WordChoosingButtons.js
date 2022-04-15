import React, { useEffect, useState, useRef } from 'react'
import Axios from 'axios'
import classes from './WordChoosingButtons.module.css'
import { useNavigate } from 'react-router'
import server from '../ServerInfo'
import { toast } from 'react-toastify'


function WordChoosingButtons() {
    const [wordBank, setWordBank] = useState([])

    const navigate = useNavigate()
    useEffect(() => {
        Axios.get(`${server}/Words/getRandomsWords`)
            .then((res) => {
                setWordBank(res.data)
            }).catch((error) => {
                const message = error.response ? error.response.data : "Network Error";
                toast.error(message)
            })
    }, [])
    const sendWord = (event) => {
        Axios.post(`${server}/words/receivingChosenWord`, 
        { word: event.currentTarget.textContent },
        { headers: { "room-id": localStorage.getItem("RoomID") } })
            .then((res) => {
                navigate('/draw')
            }).catch((error) => {
                const message = error.response ? error.response.data : "Network Error";
                toast.error(message)
            })
    }
    return (
        <div className={classes.container}>
            <h1>Word choosing</h1>
            {wordBank.map((item,i) => {
                return (<div><br />
                    <button onClick={sendWord} key={i}><span>{item}</span></button>
                </div>
                )
            })}
        </div>
    )

}
export default WordChoosingButtons