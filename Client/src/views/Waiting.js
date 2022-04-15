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
    const checkIfJoined = async () => {

        interval = setInterval(() => {
            Axios.get(`${server}/users/checkAmountOfPlayers`,
                { headers: { "room-id": localStorage.getItem("RoomID") } })
                .then((res) => {
                    console.log(res.data);
                    if(res.data > 1){
                        clearInterval(interval);
                        navigate('/wordChoosing')
                    }
                }).catch((error) => {
                    const message = error.response ? error.response.data : "Network Error";
                    toast.error(message)
                })
        }, 5000);
    }
    useEffect(()=>{
        checkIfJoined()
    })
    return (
        <div>
            <h1 style={{textAlign: 'center', marginTop:'80px'}}>Waiting for other player to join</h1>
            <h2 style={{textAlign: 'center', marginTop:'80px'}}>Room ID: {localStorage.getItem('RoomID')}</h2>
            <lottie-player 
            src="https://assets2.lottiefiles.com/packages/lf20_lpxbl3en.json" 
            background="transparent" 
            speed="1" 
            style={{width: "500px", height: "500px",margin:'0 auto'}}
            loop autoplay
            ></lottie-player>
            <ExitButton className={classes.wait__container}/>

        </div>
    )
}

export default Waiting