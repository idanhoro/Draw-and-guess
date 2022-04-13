import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import classes from './Welcome.module.css'
import { useNavigate } from 'react-router'

const Welcome = () => {
  const [roomID, setRoomID] = useState()
  const navigate = useNavigate()

  const requestNewRoom = () =>{
    Axios.get('http://localhost:3008/users/getRoomID')
    .then((res)=>{
      localStorage.setItem('RoomID', res.data)
      navigate('/waitting')
  }).catch((error)=>{
      console.log(error)
  });
}

  const joinRoom = () =>{
    Axios.post('http://localhost:3008/users/joinRoom', {roomID})
    .then((res) =>{
      console.log(res.data)
      localStorage.setItem('RoomID', res.data)
    })
    .catch((error) =>{
      console.log(error)  
    });
  }


  return (
    <div className={classes.welcome__container}>
        <h1>Draw & Guess</h1>
        
        <button className={`${classes.create__room} ${classes.btn}`} onClick={requestNewRoom}>Create new room</button>
        <div className={classes.input__container}>
        <label>Room ID: </label>
        <input className={classes.input} type="text" id="Room ID" onChange={(event)=>{setRoomID(event.target.value)}}></input>
        <button className={classes.btn} onClick={joinRoom}>Join</button>
        </div>

    </div>
  )
}

export default Welcome