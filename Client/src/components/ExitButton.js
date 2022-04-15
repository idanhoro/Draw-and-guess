import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Axios from 'axios'
import server from '../ServerInfo'


const ExitButton = () => {
    var interval
    const navigate = useNavigate()

    useEffect(() => {
        checkIfPlayerLeft()
    }, [])

    const checkIfPlayerLeft = () => {
        interval = setInterval(() => {

            Axios.get(`${server}/users/checkAmountOfPlayers`,
                { headers: { "room-id": localStorage.getItem("RoomID") } })
                .then((res) => {
                    if (res.data == 1) {
                        clearInterval(interval);
                        navigate('/waiting')
                    }
                }).catch((error) => {
                    console.log(error)
                })
        }, 5000);
    }


    const handleReleaseRoom = () => {
        Axios.get(`${server}/users/releaseRoom`,
        { headers: { "room-id": localStorage.getItem("RoomID") } })
            .then((res) => {
                navigate('/')
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <button onClick={handleReleaseRoom}>Exit</button>
        </div>
    )
}


export default ExitButton