import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Axios from 'axios'
import server from '../ServerInfo'
import { toast } from 'react-toastify'


const ExitButton = () => {
    var interval
    const navigate = useNavigate()
    const headers = { "room-id": localStorage.getItem("RoomID") }


    useEffect(() => {
        checkIfPlayerLeft()
    }, [])

    const checkIfPlayerLeft = () => {
        interval = setInterval(() => {

            if(!localStorage.getItem('RoomID')){
                return clearInterval(interval)
            }
            Axios.get(`${server}/users/checkAmountOfPlayers`,
                {headers})
                .then((res) => {
                    if (res.data == 1) {
                        clearInterval(interval);
                        navigate('/waiting')
                    }
                }).catch((error) => {
                    const message = error.response ? error.response.data : "Network Error";
                    toast.error(message)
                })
        }, 5000);
    }


    const handleReleaseRoom = () => {
        Axios.get(`${server}/users/releaseRoom`,
        {headers})
            .then((res) => {
                clearInterval(interval);
                navigate('/')
                localStorage.removeItem("RoomID")
            }).catch((error) => {
                const message = error.response ? error.response.data : "Network Error";
                toast.error(message);
            })
    }

    return (
        <div>
            <button onClick={handleReleaseRoom}>Exit</button>
        </div>
    )
}


export default ExitButton