import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import Axios from 'axios';
import server from '../ServerInfo';
import ExitButton from '../components/ExitButton';
import classes from './Waiting.module.css'
import { toast } from 'react-toastify'


function Waiting() {
    var interval
    const navigate = useNavigate()
    const headers = { "room-id": localStorage.getItem("RoomID") }
    const checkIfJoined = async () => {

        interval = setInterval(() => {
            Axios.get(`${server}/users/checkAmountOfPlayers`,
                { headers })
                .then((res) => {
                    console.log(res.data);
                    if (res.data != 1) {
                        clearInterval(interval);
                        if (res.data > 1) {
                            navigate('/wordChoosing')
                        }
                    }
                }).catch((error) => {
                    const message = error.response ? error.response.data : "Network Error";
                    toast.error(message)
                })
        }, 5000);
    }
    useEffect(() => {
        checkIfJoined()
    })
    return (
        <div className={classes.wait__container}>
            <h1 style={{ textAlign: 'center', marginTop: '80px' }}>Waiting for other player to join</h1>
            <h2 style={{ textAlign: 'center', marginTop: '80px' }}>Room ID: {localStorage.getItem('RoomID')}</h2>
            <lottie-player
                src="https://assets2.lottiefiles.com/packages/lf20_lpxbl3en.json"
                background="transparent"
                speed="1"
                style={{ width: "500px", height: "500px", margin: '0 auto' }}
                loop autoplay
            ></lottie-player>
            <ExitButton/>

        </div>
    )
}

export default Waiting