import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import Axios from 'axios';
import server from '../ServerInfo';

function Waiting() {
    var interval
    const navigate = useNavigate()
    const checkIfJoined = async () => {

        interval = setInterval(() => {
            Axios.get(`${server}/users/checkIfJoined`,
                { headers: { "room-id": localStorage.getItem("RoomID") } })
                .then((res) => {
                    if(res.data){
                        clearInterval(interval);
                        navigate('/wordChoosing')
                    }
                }).catch((error) => {
                    console.log(error)
                })
        }, 5000);
    }
    useEffect(()=>{
        checkIfJoined()
    })
    return (
        <div>
            <h1 style={{textAlign: 'center', marginTop:'80px'}}>Waiting</h1>
            <h2 style={{textAlign: 'center', marginTop:'80px'}}>Room ID: {localStorage.getItem('RoomID')}</h2>
            <lottie-player 
            src="https://assets2.lottiefiles.com/packages/lf20_lpxbl3en.json" 
            background="transparent" 
            speed="1" 
            style={{width: "500px", height: "500px",margin:'0 auto'}}
            loop autoplay
            ></lottie-player>
        </div>
    )
}

export default Waiting