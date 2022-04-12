import React from 'react'
import Axios from 'axios'

const Welcome = () => {
  const requestNewRoom = () =>{
    Axios.get('http://localhost:3008/users/getRoomID')
    .then((req)=>{
      localStorage.setItem('RoomID', req.data)
  }).catch((error)=>{
      console.log(error)
  });
}
  return (
    <div>
        <h1>Draw & Guess</h1>
        <br/>
        <button onClick={requestNewRoom}>Create new room</button>
        <br/>
        <br/>
        <label>Room ID: </label>
        <input type="text" id="Room ID"></input>
        <button>Join</button>
        <label></label>


    </div>
  )
}

export default Welcome