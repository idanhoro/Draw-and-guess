import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import classes from './Welcome.module.css'
import { useNavigate } from 'react-router'
import server from '../ServerInfo'

const Welcome = () => {
  const [roomID, setRoomID] = useState()
  const navigate = useNavigate()

  const requestNewRoom = () =>{
    Axios.get(`${server}/users/getRoomID`)
    .then((res)=>{
      localStorage.setItem('RoomID', res.data)
      navigate('/waiting')
  }).catch((error)=>{
      console.log(error)
  });
}

  const joinRoom = () =>{
    Axios.post(`${server}/users/joinRoom`, {roomID})
    .then((res) =>{
      localStorage.setItem('RoomID', res.data)
      navigate('/guess')
    })
    .catch((error) =>{
      console.log(error)  
    });
  }


  return (
    <div className={classes.welcome__container}>
        <h1>Draw & Guess</h1>
        
        <button className={`${classes.create__room} ${classes.btn}`} onClick={requestNewRoom}>Create new room</button>

        <br/>
        <div className={classes.input__container}>
        <label>Enter Room ID: </label>
        <input className={classes.input} type="number" id="Room ID" onChange={(event)=>{setRoomID(event.target.value)}}></input>
        <button className={classes.btn} onClick={joinRoom}>Join</button>
        </div>

    </div>
  )
}

export default Welcome