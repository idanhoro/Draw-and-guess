import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Axios from 'axios'
import server from '../ServerInfo'
import { toast } from 'react-toastify'

const headers = { "room-id": localStorage.getItem("RoomID") }

const ExitButton = () => {
    var interval
    const navigate = useNavigate()

    useEffect(() => {
        checkIfPlayerLeft()
    }, [])

    const checkIfPlayerLeft = () => {
        interval = setInterval(() => {

            console.log(headers);
            Axios.get(`${server}/users/checkAmountOfPlayers`,
                {headers})
                .then((res) => {
                    if (res.data == 1) {
                        navigate('/waiting')
                        clearInterval(interval);
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